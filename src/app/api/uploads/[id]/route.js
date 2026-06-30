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

    const upload = await sql(
      `SELECT u.*, r.* FROM tc_uploads u
       LEFT JOIN tc_reports r ON r.upload_id = u.id
       WHERE u.id = $1 AND u.user_id = $2 LIMIT 1`,
      [id, userId],
    );

    if (!upload[0]) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ upload: upload[0] });
  } catch (err) {
    console.error("GET /api/uploads/[id] error:", err);
    return Response.json({ error: "Failed to fetch upload" }, { status: 500 });
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

    await sql(`DELETE FROM tc_uploads WHERE id = $1 AND user_id = $2`, [
      id,
      userId,
    ]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/uploads/[id] error:", err);
    return Response.json({ error: "Failed to delete upload" }, { status: 500 });
  }
}
