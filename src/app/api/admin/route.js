import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

async function checkAdmin(session) {
  if (!session?.user?.id) return false;
  const result = await sql(
    `SELECT role FROM auth_users WHERE id = $1 LIMIT 1`,
    [session.user.id],
  );
  return result[0]?.role === "admin";
}

export async function GET(request) {
  try {
    const session = await auth();
    const isAdmin = await checkAdmin(session);
    if (!isAdmin) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "stats";

    if (type === "stats") {
      const [users, uploads, reports, contacts, messages] =
        await sql.transaction([
          sql`SELECT COUNT(*) FROM auth_users`,
          sql`SELECT COUNT(*) FROM tc_uploads`,
          sql`SELECT COUNT(*) FROM tc_reports`,
          sql`SELECT COUNT(*) FROM tc_contact_messages`,
          sql`SELECT COUNT(*) FROM tc_contact_messages WHERE status = 'unread'`,
        ]);

      const recentActivity = await sql(
        `SELECT 'upload' as type, filename as label, created_at FROM tc_uploads
         UNION ALL
         SELECT 'report' as type, fabric_type as label, created_at FROM tc_reports
         ORDER BY created_at DESC LIMIT 10`,
      );

      const weeklyData = await sql(
        `SELECT
           DATE_TRUNC('day', created_at) as day,
           COUNT(*) as count
         FROM tc_uploads
         WHERE created_at >= NOW() - INTERVAL '7 days'
         GROUP BY day ORDER BY day`,
      );

      return Response.json({
        stats: {
          totalUsers: parseInt(users[0].count),
          totalUploads: parseInt(uploads[0].count),
          totalReports: parseInt(reports[0].count),
          totalMessages: parseInt(contacts[0].count),
          unreadMessages: parseInt(messages[0].count),
        },
        recentActivity,
        weeklyData,
      });
    }

    if (type === "users") {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = 20;
      const offset = (page - 1) * limit;
      const users = await sql(
        `SELECT u.id, u.name, u.email, u.image, u.role,
           (SELECT COUNT(*) FROM tc_uploads WHERE user_id = u.id::text) as upload_count
         FROM auth_users u
         ORDER BY u.id DESC LIMIT $1 OFFSET $2`,
        [limit, offset],
      );
      const countResult = await sql`SELECT COUNT(*) FROM auth_users`;
      return Response.json({ users, total: parseInt(countResult[0].count) });
    }

    if (type === "uploads") {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = 20;
      const offset = (page - 1) * limit;
      const uploads = await sql(
        `SELECT u.*, r.fabric_type, r.confidence_score, r.quality_grade,
           au.email as user_email, au.name as user_name
         FROM tc_uploads u
         LEFT JOIN tc_reports r ON r.upload_id = u.id
         LEFT JOIN auth_users au ON au.id::text = u.user_id
         ORDER BY u.created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset],
      );
      const countResult = await sql`SELECT COUNT(*) FROM tc_uploads`;
      return Response.json({ uploads, total: parseInt(countResult[0].count) });
    }

    if (type === "messages") {
      const messages = await sql(
        `SELECT * FROM tc_contact_messages ORDER BY created_at DESC LIMIT 50`,
      );
      return Response.json({ messages });
    }

    return Response.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    console.error("GET /api/admin error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    const isAdmin = await checkAdmin(session);
    if (!isAdmin) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { action, userId, messageId, role } = await request.json();

    if (action === "updateRole" && userId && role) {
      await sql(`UPDATE auth_users SET role = $1 WHERE id = $2`, [
        role,
        userId,
      ]);
      return Response.json({ success: true });
    }

    if (action === "markMessageRead" && messageId) {
      await sql(
        `UPDATE tc_contact_messages SET status = 'read' WHERE id = $1`,
        [messageId],
      );
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("PUT /api/admin error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    const isAdmin = await checkAdmin(session);
    if (!isAdmin) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { type, id } = await request.json();

    if (type === "upload") {
      await sql(`DELETE FROM tc_uploads WHERE id = $1`, [id]);
    } else if (type === "user") {
      await sql(`DELETE FROM auth_users WHERE id = $1`, [id]);
    } else if (type === "message") {
      await sql(`DELETE FROM tc_contact_messages WHERE id = $1`, [id]);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
