function escapeHTML(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(input = "") {
  return escapeHTML(input).replace(/\r?\n/g, "<br/>");
}

export function renderContactEmail({
  siteName = "TEENX TECH",
  siteUrl = "https://teenxtech.vercel.app",
  logoUrl,
  firstName = "",
  lastName = "",
  email = "",
  subject = "",
  message = "",
}) {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ").trim() || "-";
  const preheader = `${fullName} • ${subject || "Pesan baru"} • ${email}`;
  const text = [
    `${siteName} – Pesan Baru dari Form Kontak`,
    "",
    `Nama   : ${fullName}`,
    `Email  : ${email || "-"}`,
    `Subjek : ${subject || "-"}`,
    "",
    "Pesan:",
    message || "-",
    "",
    `— ${siteName}`,
    siteUrl,
  ].join("\n");

  const html = `<!doctype html>
<html lang="id">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${escapeHTML(siteName)} – Pesan Baru</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .px { padding-left: 16px !important; padding-right: 16px !important; }
        .py { padding-top: 16px !important; padding-bottom: 16px !important; }
        .h1 { font-size: 22px !important; line-height: 28px !important; }
      }
      /* Dark-mode friendly colors (clients that support it) */
      @media (prefers-color-scheme: dark) {
        .bg-page { background: #0a0a0a !important; }
        .bg-card { background: #111213 !important; }
        .text { color: #f5f5f5 !important; }
        .muted { color: #c7c7c7 !important; }
        .border { border-color: #2a2a2a !important; }
      }
    </style>
  </head>
  <body style="margin:0;background:#f6f7f9;" class="bg-page">
    <!-- Preheader (hidden) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHTML(preheader)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7f9;margin:0;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #ececec;">
            <!-- Header -->
            <tr>
              <td class="px py" style="padding:24px 28px;border-bottom:1px solid #ececec;background:#ffffff;">
                <table role="presentation" width="100%">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      ${
                        logoUrl
                          ? `<img src="${escapeHTML(
                              logoUrl
                            )}" width="28" height="28" alt="${escapeHTML(
                              siteName
                            )}" style="display:inline-block;border:0;outline:none;text-decoration:none;vertical-align:middle;"/>`
                          : ""
                      }
                      <span class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:16px;font-weight:600;letter-spacing:.2px;margin-left:${
                        logoUrl ? 8 : 0
                      }px;color:#111111;vertical-align:middle;">${escapeHTML(
    siteName
  )}</span>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <a href="${escapeHTML(
                        siteUrl
                      )}" target="_blank" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#6b7280;text-decoration:none;">${escapeHTML(
    siteUrl
  )}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td class="px py" style="padding:28px 28px 8px 28px;background:#ffffff;">
                <h1 class="h1 text" style="margin:0 0 4px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:24px;line-height:32px;color:#111111;">
                  Pesan Baru dari Form Kontak
                </h1>
                <p class="muted" style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;line-height:20px;color:#6b7280;">
                  Anda menerima pesan baru dari pengunjung situs.
                </p>
              </td>
            </tr>

            <!-- Summary -->
            <tr>
              <td class="px" style="padding:12px 28px 4px 28px;background:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0;">
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#6b7280;padding:6px 0;">Nama</td>
                    <td class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#111111;padding:6px 0;">${escapeHTML(
                      fullName
                    )}</td>
                  </tr>
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#6b7280;padding:6px 0;">Email</td>
                    <td style="padding:6px 0;">
                      <a href="mailto:${escapeHTML(
                        email
                      )}" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#111111;text-decoration:underline;">${escapeHTML(
    email || "-"
  )}</a>
                    </td>
                  </tr>
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#6b7280;padding:6px 0;">Subjek</td>
                    <td class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#111111;padding:6px 0;">${escapeHTML(
                      subject || "-"
                    )}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message card -->
            <tr>
              <td class="px py" style="padding:8px 28px 24px 28px;background:#ffffff;">
                <table role="presentation" width="100%" style="background:#111111;color:#f5f5f5;">
                  <tr>
                    <td style="padding:16px 18px;border:1px solid #111111;">
                      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:22px;color:#f5f5f5;">
                        ${nl2br(message || "-")}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Actions -->
            <tr>
              <td class="px py" style="padding:0 28px 28px 28px;background:#ffffff;">
                <!-- Button: reply -->
                <a href="mailto:${escapeHTML(
                  email
                )}?subject=${encodeURIComponent(
    `Re: ${subject || "Pesan Anda"}`
  )}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;padding:10px 14px;border:1px solid #111111;">
                  Balas Email
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="px py" style="padding:16px 28px;background:#ffffff;border-top:1px solid #ececec;">
                <p class="muted" style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#6b7280;">
                  Email ini dikirim otomatis dari formulir kontak ${escapeHTML(
                    siteName
                  )}.
                </p>
              </td>
            </tr>
          </table>

          <!-- spacer -->
          <div style="height:24px;line-height:24px">&nbsp;</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { preheader, text, html };
}
