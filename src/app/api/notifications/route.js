import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const notifications = await sql(
      `SELECT * FROM tc_notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [userId],
    );

    const unreadCount = await sql(
      `SELECT COUNT(*) FROM tc_notifications WHERE user_id = $1 AND is_read = false`,
      [userId],
    );

    return Response.json({
      notifications,
      unreadCount: parseInt(unreadCount[0].count),
    });
  } catch (err) {
    console.error("GET /api/notifications error:", err);
    return Response.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id, markAll } = await request.json();

    if (markAll) {
      await sql(
        `UPDATE tc_notifications SET is_read = true WHERE user_id = $1`,
        [userId],
      );
    } else if (id) {
      await sql(
        `UPDATE tc_notifications SET is_read = true WHERE id = $1 AND user_id = $2`,
        [id, userId],
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("PUT /api/notifications error:", err);
    return Response.json(
      { error: "Failed to update notifications" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = await request.json();

    if (id) {
      await sql(`DELETE FROM tc_notifications WHERE id = $1 AND user_id = $2`, [
        id,
        userId,
      ]);
    } else {
      await sql(`DELETE FROM tc_notifications WHERE user_id = $1`, [userId]);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/notifications error:", err);
    return Response.json(
      { error: "Failed to delete notifications" },
      { status: 500 },
    );
  }
}
