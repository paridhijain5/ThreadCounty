import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// This route promotes a user to admin role.
// IMPORTANT: Delete this route after you've promoted yourself to admin.
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "You must be logged in" }, { status: 401 });
    }
    const userId = session.user.id;

    // Ensure role column exists
    try {
      await sql`ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user'`;
    } catch (e) {
      // Column might already exist
    }

    await sql(`UPDATE auth_users SET role = 'admin' WHERE id = $1`, [userId]);

    return Response.json({
      success: true,
      message: `User ${session.user.email} has been promoted to admin.`,
    });
  } catch (err) {
    console.error("POST /api/admin/promote error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
