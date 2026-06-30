import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const result = await sql(
      `SELECT * FROM tc_settings WHERE user_id = $1 LIMIT 1`,
      [userId],
    );

    const settings = result[0] || {
      email_notifications: true,
      analysis_alerts: true,
      weekly_report: false,
      theme: "dark",
      language: "en",
    };

    return Response.json({ settings });
  } catch (err) {
    console.error("GET /api/settings error:", err);
    return Response.json(
      { error: "Failed to fetch settings" },
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
    const body = await request.json();
    const {
      email_notifications,
      analysis_alerts,
      weekly_report,
      theme,
      language,
    } = body;

    await sql(
      `INSERT INTO tc_settings (user_id, email_notifications, analysis_alerts, weekly_report, theme, language, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         email_notifications = EXCLUDED.email_notifications,
         analysis_alerts = EXCLUDED.analysis_alerts,
         weekly_report = EXCLUDED.weekly_report,
         theme = EXCLUDED.theme,
         language = EXCLUDED.language,
         updated_at = NOW()`,
      [
        userId,
        email_notifications ?? true,
        analysis_alerts ?? true,
        weekly_report ?? false,
        theme || "dark",
        language || "en",
      ],
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    return Response.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
