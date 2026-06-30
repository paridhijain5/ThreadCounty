import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = params;

    const report = await sql(
      `SELECT r.*, u.filename, u.image_url, u.created_at as upload_date, u.file_size
       FROM tc_reports r
       LEFT JOIN tc_uploads u ON u.id = r.upload_id
       WHERE r.id = $1 AND r.user_id = $2 LIMIT 1`,
      [id, userId],
    );

    if (!report[0]) {
      return Response.json({ error: "Report not found" }, { status: 404 });
    }
    return Response.json({ report: report[0] });
  } catch (err) {
    console.error("GET /api/reports/[id] error:", err);
    return Response.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = params;

    await sql(`DELETE FROM tc_reports WHERE id = $1 AND user_id = $2`, [
      id,
      userId,
    ]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/reports/[id] error:", err);
    return Response.json({ error: "Failed to delete report" }, { status: 500 });
  }
}
