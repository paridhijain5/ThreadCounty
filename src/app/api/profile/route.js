import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const [userRows, profileRows, subRows] = await sql.transaction([
      sql`SELECT id, name, email, image FROM auth_users WHERE id = ${userId} LIMIT 1`,
      sql`SELECT * FROM tc_user_profiles WHERE user_id = ${userId} LIMIT 1`,
      sql`SELECT * FROM tc_subscriptions WHERE user_id = ${userId} LIMIT 1`,
    ]);

    const uploadStats = await sql(
      `SELECT COUNT(*) as total, SUM(file_size) as total_size FROM tc_uploads WHERE user_id = $1`,
      [userId],
    );

    return Response.json({
      user: userRows[0] || null,
      profile: profileRows[0] || null,
      subscription: subRows[0] || {
        plan: "free",
        uploads_used: 0,
        uploads_limit: 5,
      },
      stats: uploadStats[0],
    });
  } catch (err) {
    console.error("GET /api/profile error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await request.json();
    const { name, company, bio, phone, website, location, job_title } = body;

    // Update auth_users name if provided
    if (name) {
      await sql(`UPDATE auth_users SET name = $1 WHERE id = $2`, [
        name,
        userId,
      ]);
    }

    // Upsert extended profile
    await sql(
      `INSERT INTO tc_user_profiles (user_id, company, bio, phone, website, location, job_title, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         company = EXCLUDED.company,
         bio = EXCLUDED.bio,
         phone = EXCLUDED.phone,
         website = EXCLUDED.website,
         location = EXCLUDED.location,
         job_title = EXCLUDED.job_title,
         updated_at = NOW()`,
      [
        userId,
        company || null,
        bio || null,
        phone || null,
        website || null,
        location || null,
        job_title || null,
      ],
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("PUT /api/profile error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
