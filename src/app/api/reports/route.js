import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const reports = await sql(
      `SELECT r.*, u.filename, u.image_url, u.created_at as upload_date
       FROM tc_reports r
       LEFT JOIN tc_uploads u ON u.id = r.upload_id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );

    const countResult = await sql(
      `SELECT COUNT(*) FROM tc_reports WHERE user_id = $1`,
      [userId],
    );

    const stats = await sql(
      `SELECT
        COUNT(*) as total_reports,
        AVG(confidence_score) as avg_confidence,
        AVG(thread_density) as avg_density
       FROM tc_reports WHERE user_id = $1`,
      [userId],
    );

    return Response.json({
      reports,
      total: parseInt(countResult[0].count),
      stats: stats[0],
      page,
      limit,
    });
  } catch (err) {
    console.error("GET /api/reports error:", err);
    return Response.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}
