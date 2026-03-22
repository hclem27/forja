import { Resend } from 'resend'

export async function sendPreviewEmail({
  to,
  businessName,
  sessionId,
}: {
  to: string
  businessName: string
  sessionId: string
}) {
  const previewUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${sessionId}`

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'Forja.ai <onboarding@resend.dev>',
    to,
    subject: `Votre landing page "${businessName}" est prête ✨`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Votre landing page est prête</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#f97316);padding:36px 40px;text-align:center;">
            <p style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              Forja<span style="opacity:0.75;">.ai</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">
              Votre site est prêt 🎉
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
              La landing page de <strong style="color:#111827;">${businessName}</strong> vient d'être générée par notre IA. Accédez-y pour la prévisualiser, la modifier ou la télécharger.
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="background:linear-gradient(135deg,#7c3aed,#f97316);border-radius:12px;">
                  <a href="${previewUrl}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                    Voir ma landing page →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border-radius:12px;margin-bottom:32px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#6d28d9;text-transform:uppercase;letter-spacing:0.05em;">Ce qui vous attend</p>
                  <ul style="margin:0;padding:0 0 0 16px;color:#374151;font-size:14px;line-height:2;">
                    <li>Prévisualisation sur desktop, tablette et mobile</li>
                    <li>5 modifications gratuites par l'IA</li>
                    <li>Téléchargement du site (HTML + CSS + images) pour 29€</li>
                  </ul>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
              Le lien est valable <strong>7 jours</strong>. Après cette période, vous devrez générer un nouveau site.<br/>
              Vous pouvez aussi retrouver ce mail dans votre boîte pour y revenir plus tard.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #f3f4f6;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Forja.ai — Développé par <a href="https://spays.fr" style="color:#7c3aed;text-decoration:none;">Spays</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
