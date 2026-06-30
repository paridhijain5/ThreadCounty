import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const result = await sql(
      `INSERT INTO tc_contact_messages (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, 'unread')
       RETURNING *`,
      [name, email, subject || "General Inquiry", message],
    );

    return Response.json({ success: true, message: result[0] });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
