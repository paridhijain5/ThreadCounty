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
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    let uploads, total;
    if (search) {
      uploads = await sql(
        `SELECT u.*, r.fabric_type, r.confidence_score, r.quality_grade, r.id as report_id
         FROM tc_uploads u
         LEFT JOIN tc_reports r ON r.upload_id = u.id
         WHERE u.user_id = $1 AND u.filename ILIKE $2
         ORDER BY u.created_at DESC LIMIT $3 OFFSET $4`,
        [userId, `%${search}%`, limit, offset],
      );
      const countResult = await sql(
        `SELECT COUNT(*) FROM tc_uploads WHERE user_id = $1 AND filename ILIKE $2`,
        [userId, `%${search}%`],
      );
      total = parseInt(countResult[0].count);
    } else {
      uploads = await sql(
        `SELECT u.*, r.fabric_type, r.confidence_score, r.quality_grade, r.id as report_id
         FROM tc_uploads u
         LEFT JOIN tc_reports r ON r.upload_id = u.id
         WHERE u.user_id = $1
         ORDER BY u.created_at DESC LIMIT $2 OFFSET $3`,
        [userId, limit, offset],
      );
      const countResult = await sql(
        `SELECT COUNT(*) FROM tc_uploads WHERE user_id = $1`,
        [userId],
      );
      total = parseInt(countResult[0].count);
    }

    return Response.json({ uploads, total, page, limit });
  } catch (err) {
    console.error("GET /api/uploads error:", err);
    return Response.json({ error: "Failed to fetch uploads" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { imageUrl, filename, fileSize } = await request.json();

    if (!imageUrl || !filename) {
      return Response.json(
        { error: "imageUrl and filename required" },
        { status: 400 },
      );
    }

    const upload = await sql(
      `INSERT INTO tc_uploads (user_id, filename, image_url, file_size, status)
       VALUES ($1, $2, $3, $4, 'processing')
       RETURNING *`,
      [userId, filename, imageUrl, fileSize || 0],
    );

    // Increment subscription usage
    await sql(
      `INSERT INTO tc_subscriptions (user_id, uploads_used, uploads_limit)
       VALUES ($1, 1, 5)
       ON CONFLICT (user_id) DO UPDATE SET uploads_used = tc_subscriptions.uploads_used + 1`,
      [userId],
    );

    return Response.json({ upload: upload[0] });
  } catch (err) {
    console.error("POST /api/uploads error:", err);
    return Response.json({ error: "Failed to create upload" }, { status: 500 });
  }
}
