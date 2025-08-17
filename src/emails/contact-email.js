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
  const preheader = `${fullName} • ${subject || "Pesan baru"} • ${
    email || "-"
  }`;

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

  const ACCENT = "#111111"; // black accent for the monochrome aesthetic
  const BORDER = "#ececec";
  const BG_PAGE = "#f6f7f9";
  const FG_MAIN = "#111111";
  const FG_MUTED = "#6b7280";

  const html = `<!doctype html>
<html lang="id">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="color-scheme" content="light dark"/>
    <meta name="supported-color-schemes" content="light dark"/>
    <title>${escapeHTML(siteName)} – Pesan Baru</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .px { padding-left: 16px !important; padding-right: 16px !important; }
        .py { padding-top: 16px !important; padding-bottom: 16px !important; }
        .h1 { font-size: 22px !important; line-height: 28px !important; }
        .actions a { display:block !important; width:100% !important; margin:0 0 8px 0 !important; }
      }
      @media (prefers-color-scheme: dark) {
        .bg-page { background: #0a0a0a !important; }
        .card { background: #111213 !important; border-color: #2a2a2a !important; }
        .text { color: #f5f5f5 !important; }
        .muted { color: #c7c7c7 !important; }
        .divider { border-color: #2a2a2a !important; }
        .msg { background: #0e0e0f !important; border-color: #0e0e0f !important; color:#f5f5f5 !important; }
        .btn-primary { background:#ffffff !important; color:#111111 !important; border-color:#ffffff !important; }
        .btn-ghost { color:#f5f5f5 !important; border-color:#2a2a2a !important; }
        .chip { background:#1a1a1a !important; color:#e5e5e5 !important; border-color:#2a2a2a !important; }
      }
    </style>
  </head>
  <body style="margin:0;background:${BG_PAGE};" class="bg-page">
    <!-- Preheader -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHTML(preheader)}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:24px 0;background:${BG_PAGE};">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" class="container" style="width:640px;max-width:640px;background:#ffffff;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;" >
            <!-- Header -->
            <tr>
              <td class="px py" style="padding:22px 28px;border-bottom:1px solid ${BORDER};background:#ffffff;">
                <table role="presentation" width="100%">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      ${
                        logoUrl
                          ? `<img src="${escapeHTML(
                              logoUrl
                            )}" width="28" height="28" alt="${escapeHTML(
                              siteName
                            )}" style="display:inline-block;border:0;outline:none;text-decoration:none;vertical-align:middle;border-radius:6px;"/>`
                          : ""
                      }
                      <span class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:.2px;margin-left:${
                        logoUrl ? 10 : 0
                      }px;color:${FG_MAIN};vertical-align:middle;">
                        ${escapeHTML(siteName)}
                      </span>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span class="chip" style="display:inline-block;border:1px solid ${BORDER};background:#f6f7f9;color:${FG_MUTED};font-family:Inter,Segoe UI,Arial,sans-serif;font-size:11px;padding:6px 10px;border-radius:999px;letter-spacing:.3px;">
                        CONTACT
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td class="px" style="padding:28px 28px 8px 28px;background:#ffffff;">
                <h1 class="h1 text" style="margin:0 0 6px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:24px;line-height:32px;color:${FG_MAIN};letter-spacing:-0.2px;">
                  Pesan Baru dari Form Kontak
                </h1>
                <p class="muted" style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:13px;line-height:20px;color:${FG_MUTED};">
                  Anda menerima pesan baru dari pengunjung situs.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:8px 28px 0 28px;background:#ffffff;">
                <hr class="divider" style="border:none;border-top:1px solid ${BORDER};height:1px;margin:0;" />
              </td>
            </tr>

            <!-- Summary -->
            <tr>
              <td class="px" style="padding:14px 28px 10px 28px;background:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:${FG_MUTED};padding:6px 0;">Nama</td>
                    <td class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:${FG_MAIN};padding:6px 0;">${escapeHTML(
    fullName
  )}</td>
                  </tr>
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:${FG_MUTED};padding:6px 0;">Email</td>
                    <td style="padding:6px 0;">
                      <a href="mailto:${escapeHTML(
                        email
                      )}" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:${FG_MAIN};text-decoration:underline;">
                        ${escapeHTML(email || "-")}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td width="120" class="muted" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:${FG_MUTED};padding:6px 0;">Subjek</td>
                    <td class="text" style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:${FG_MAIN};padding:6px 0;">${escapeHTML(
    subject || "-"
  )}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td class="px py" style="padding:8px 28px 24px 28px;background:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
                  <tr>
                    <td class="msg" style="background:${ACCENT}; color:#ffffff; padding:16px 18px; border:1px solid ${ACCENT}; border-radius:12px;">
                      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:22px;">
                        ${nl2br(message || "-")}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Actions -->
            <tr>
              <td class="px py actions" style="padding:0 28px 28px 28px;background:#ffffff;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:8px;">
                      <a class="btn-primary" href="mailto:${escapeHTML(
                        email
                      )}?subject=${encodeURIComponent(
    `Re: ${subject || "Pesan Anda"}`
  )}"
                         style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;padding:10px 14px;border:1px solid #111111;border-radius:10px;">
                        Balas Email
                      </a>
                    </td>
                    <td>
                      <a class="btn-ghost" href="${escapeHTML(
                        siteUrl
                      )}" target="_blank"
                         style="display:inline-block;background:#ffffff;color:${FG_MAIN};text-decoration:none;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;padding:10px 14px;border:1px solid ${BORDER};border-radius:10px;">
                        Buka Situs
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="px py" style="padding:16px 28px;background:#ffffff;border-top:1px solid ${BORDER};border-bottom-left-radius:14px;border-bottom-right-radius:14px;">
                <p class="muted" style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:${FG_MUTED};">
                  Email ini dikirim otomatis dari formulir kontak ${escapeHTML(
                    siteName
                  )}. Jika Anda merasa tidak mengharapkan email ini, abaikan saja.
                </p>
              </td>
            </tr>
          </table>

          <div style="height:24px;line-height:24px">&nbsp;</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { preheader, text, html };
}
