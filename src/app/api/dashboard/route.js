import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const [uploadsResult, reportsResult, subResult, notifResult] =
      await sql.transaction([
        sql`SELECT COUNT(*) as total, SUM(file_size) as total_size FROM tc_uploads WHERE user_id = ${userId}`,
        sql`SELECT COUNT(*) as total, AVG(confidence_score) as avg_confidence FROM tc_reports WHERE user_id = ${userId}`,
        sql`SELECT * FROM tc_subscriptions WHERE user_id = ${userId} LIMIT 1`,
        sql`SELECT COUNT(*) FROM tc_notifications WHERE user_id = ${userId} AND is_read = false`,
      ]);

    const recentUploads = await sql(
      `SELECT u.*, r.fabric_type, r.confidence_score, r.quality_grade, r.id as report_id
       FROM tc_uploads u LEFT JOIN tc_reports r ON r.upload_id = u.id
       WHERE u.user_id = $1 ORDER BY u.created_at DESC LIMIT 5`,
      [userId],
    );

    const weeklyUploads = await sql(
      `SELECT DATE_TRUNC('day', created_at)::date as day, COUNT(*) as count
       FROM tc_uploads WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '7 days'
       GROUP BY day ORDER BY day`,
      [userId],
    );

    const monthlyQuality = await sql(
      `SELECT DATE_TRUNC('month', created_at)::date as month,
              AVG(confidence_score) as avg_quality, COUNT(*) as count
       FROM tc_reports WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '6 months'
       GROUP BY month ORDER BY month`,
      [userId],
    );

    return Response.json({
      stats: {
        totalUploads: parseInt(uploadsResult[0]?.total || 0),
        totalStorage: parseInt(uploadsResult[0]?.total_size || 0),
        totalReports: parseInt(reportsResult[0]?.total || 0),
        avgConfidence: parseFloat(reportsResult[0]?.avg_confidence || 0),
        unreadNotifications: parseInt(notifResult[0]?.count || 0),
      },
      subscription: subResult[0] || {
        plan: "free",
        uploads_used: 0,
        uploads_limit: 5,
      },
      recentUploads,
      weeklyUploads,
      monthlyQuality,
    });
  } catch (err) {
    console.error("GET /api/dashboard error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
