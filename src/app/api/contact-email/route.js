import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderContactEmail } from "@/emails/contact-email";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body || {};

    // Basic validation, karena dia ga haus validasi, ni dunia ni gw hancurin ni dua ni
    if (!firstName || !email || !subject || !message) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const toEmail = process.env.CONTACT_TO_EMAIL || "teamteenx@gmail.com";

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";
    const logoUrl = `${siteUrl}/images/opium.svg`;

    const { html, text } = renderContactEmail({
      siteName: "TeenX",
      siteUrl,
      logoUrl,
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "TeenX <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `[TeenX Contact] ${subject} — ${firstName}${
        lastName ? " " + lastName : ""
      }`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact-email error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
