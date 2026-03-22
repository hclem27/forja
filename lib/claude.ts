import Anthropic from '@anthropic-ai/sdk'
import type { WizardData } from './types'
import { getBusinessProfile } from './types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const INDUSTRY_PHOTOS: Record<string, string[]> = {
  'saas/tech': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  consulting: [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1521737604082-18e7abad5c33?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  'e-commerce': [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  'restaurant/food': [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  'fitness/wellness': [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  'real estate': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
  'education/coaching': [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=900&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&h=900&fit=crop&auto=format&q=80',
  ],
}

function getPhotosForIndustry(industry: string): string[] {
  const key = Object.keys(INDUSTRY_PHOTOS).find(k =>
    industry.toLowerCase().includes(k.split('/')[0])
  )
  return INDUSTRY_PHOTOS[key ?? 'consulting']
}

function buildSystemPrompt(): string {
  return `You are a senior front-end developer and UX designer with 15 years of experience building landing pages for funded startups and premium brands. Your work has been featured on Awwwards. You write HTML/CSS/JS by hand — never use frameworks or libraries.

═══ NON-NEGOTIABLE OUTPUT RULES ═══
• Output ONLY raw HTML. Starts with <!DOCTYPE html>, ends with </html>
• Zero markdown, zero code fences, zero commentary before or after
• All CSS in one <style> tag inside <head>
• All JS in one <script> tag immediately before </body>
• Google Fonts: <link rel="preconnect" href="https://fonts.googleapis.com"> + <link href="https://fonts.googleapis.com/css2?family=..."> in <head>
• Images: use ONLY the exact Unsplash URLs provided. Never invent URLs.
• VISIBILITY: all content must be visible on load. Never set opacity:0 or display:none on content. CSS @keyframes must use animation-fill-mode:both with a visible \`from\` state. Page must work perfectly with JS disabled.
• Minimum 600 lines of HTML + CSS + JS total
• NEVER use markdown syntax inside HTML content: no "- item", no "**bold**", no "## heading". Use proper HTML tags only (<ul><li>, <strong>, <h2>, etc.)
• NEVER output a dash "- " at the start of a line inside any HTML element. Use <ul><li> for lists.

═══ NAV IMPLEMENTATION (STRICT) ═══
The <nav> element itself must have: position:sticky; top:0; z-index:1000; width:100%
The nav inner layout: display:flex; align-items:center; justify-content:space-between; on a single .nav-inner container with max-width and padding.
NEVER put position:sticky on a wrapper div around the nav — only on the <nav> element itself.
On mobile, the nav links collapse into a hamburger. The logo and CTA button always remain visible in the nav bar — they do NOT hide on mobile.
The hamburger button is in the nav bar. Clicking it shows/hides the nav links in a dropdown or fullscreen overlay — this must NOT affect the nav bar itself or cause any jumping.

═══ CSS CRAFT REQUIREMENTS ═══
Define a complete design token system using CSS custom properties:
  --clr-brand, --clr-brand-dark, --clr-brand-light, --clr-accent
  --clr-bg, --clr-bg-alt, --clr-surface
  --clr-text, --clr-text-muted, --clr-text-inverse
  --font-heading, --font-body
  --radius-sm, --radius-md, --radius-lg, --radius-pill
  --shadow-sm, --shadow-md, --shadow-lg
  --transition, --transition-slow
  --section-py (section vertical padding)

Typography rules:
  • h1: clamp(2.8rem, 6vw, 5.5rem), font-weight 800, line-height 1.05, letter-spacing -0.03em
  • h2: clamp(1.8rem, 3.5vw, 3rem), font-weight 700, line-height 1.2
  • Body: 1rem/1.75 minimum, --clr-text-muted for secondary text
  • All font sizes must use clamp() for fluid scaling

Layout rules:
  • CSS Grid for page structure. Flexbox for component internals.
  • Max content width: 1200px, centered with auto margins
  • Mobile-first: base styles for mobile, @media (min-width: 768px) for tablet, (min-width: 1024px) for desktop
  • No horizontal overflow. Test every section at 375px width.

Premium CSS techniques you MUST use at least 3 of:
  • backdrop-filter: blur() for glassmorphism nav
  • clip-path: polygon() or ellipse() for section shape dividers
  • CSS Grid template-areas for complex hero layouts
  • background: conic-gradient() or radial-gradient() for decorative elements
  • @keyframes with transform: translateY + opacity for entrance animations
  • box-shadow with multiple layers for depth (e.g., 0 1px 2px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.08))
  • CSS custom property + filter: hue-rotate() for color variations
  • :hover with transform: translateY(-4px) on interactive cards

═══ JAVASCRIPT REQUIREMENTS ═══
Include a <script> with:
1. Sticky nav: add .scrolled class to nav when window.scrollY > 60 (activate glassmorphism + border)
2. Mobile hamburger: toggle .nav-open class, animate burger to X, trap scroll
3. Smooth scroll: intercept anchor clicks, scrollIntoView({behavior:'smooth'})
4. Entrance animations (ENHANCEMENT only — content visible without JS):
   Use IntersectionObserver to add .in-view class to elements with [data-animate] attribute.
   CSS: [data-animate]{transform:translateY(20px)} [data-animate].in-view{transform:none;transition:transform 0.5s ease, opacity 0.5s ease}
   Important: set opacity:1 by default in CSS, only reduce it if element has both [data-animate] AND .animate-ready class added by JS on DOMContentLoaded
5. Counter animation: for stat numbers, animate from 0 to final value over 1.5s on first viewport entry

═══ WHAT MAKES PAGES LOOK AI-GENERATED (NEVER DO THIS) ═══
✗ Generic hero with centered text + vague subheadline like "La solution révolutionnaire pour votre business"
✗ 3-column card grid with icon + title + 2 lines of description repeated 6 times
✗ Testimonial cards that all say the same thing in different words
✗ CTA section that just says "Ready to get started?" with one button
✗ Footer with 4 identical columns of links
✗ Using "innovant", "révolutionnaire", "solution", "expérience" as buzzwords
✗ Brand color only used as button background — afraid to use it boldly
✗ All sections same height and same internal rhythm
✗ Hero image always in same position (always right side of split, always dark overlay)
✗ Every section has same padding, same max-width container

═══ WHAT MAKES PAGES LOOK PREMIUM ═══
✓ BOLD headline — one idea, maximum impact, under 10 words
✓ Brand color used BOLDLY: as large section bg, in big decorative text, in gradients
✓ Layout ASYMMETRY: one section breaks the grid intentionally
✓ IMAGE TREATMENT: not just placed as-is — add overlay gradient, clip it, give it a shadow + slight rotation
✓ SPECIFICITY in copy: "Réduisez votre temps de préparation de 40%" not "Gagnez du temps"
✓ VISUAL WEIGHT CONTRAST: one huge element next to tiny text creates tension and interest
✓ WHITESPACE: some sections breathe (large padding), some are dense — rhythm variation
✓ DETAIL: thin horizontal rules, subtle dot patterns in SVG, number labels in large font
✓ CTA feels URGENT: time, scarcity, or concrete benefit — "Voir votre site en 45 secondes" not "Commencer"

═══ PAGE STRUCTURE ═══
Include all sections but vary their layout and visual treatment based on the mood. Not all in same order — adapt to the narrative arc of the specific business.

Required sections:
NAV — Sticky. Logo (business name), 3-4 nav links, CTA button. Mobile: hamburger.
HERO — The most important section. Must stop the user from scrolling. Choose ONE of these layouts based on mood:
  • [SPLIT] Text left (60%) + image right (40%) clipped with clip-path
  • [DARK-FULL] Full-bleed dark bg, centered oversized h1, image as low-opacity texture layer
  • [OFFSET] Large background image, text in a white/colored card overlapping it
  • [EDITORIAL] Massive h1 spanning full width, image below with caption, minimal nav
SOCIAL PROOF — 3-4 statistics or client logos. Can be a band or integrated in hero.
FEATURES / PRODUCTS — 4-6 items. NOT always 3-col grid. Consider: alternating rows, numbered list with large numbers, 2-col with large image + details, feature cards with gradient border.
PROCESS / HOW IT WORKS — 3 steps. Numbered, clear visual flow.
TESTIMONIALS — 3 real-feeling quotes with specific results. Can be carousel-style, large quote format, or stacked.
CTA — High-contrast section. Specific headline, clear button, optional secondary link.
FOOTER — MANDATORY. Must always be the last element before </body>. Dark background (--clr-text or near-black). Contains: business name/logo in bold, tagline, 3 columns of links (navigation, legal: Mentions légales / Politique de confidentialité / CGV, contact: email + phone), copyright line "© 2025 [Business Name]. Tous droits réservés." The footer must close with </footer></main> or </footer> directly before </body>. Never omit this section.

SEO requirements:
  • <title> specific to the business (not generic)
  • <meta name="description"> 150-160 chars, benefit-focused
  • <meta property="og:title">, <meta property="og:description">, <meta property="og:type" content="website">
  • All <img> have meaningful alt attributes
  • Semantic HTML: <main>, <article>, <section>, <nav>, <header>, <footer>
  • One and only one <h1>
  • Logical heading hierarchy: h1 → h2 → h3
  • lang attribute on <html> element matching content language
  • <link rel="canonical"> placeholder

Performance:
  • <img loading="lazy"> on all images below the fold
  • <img decoding="async"> on hero image
  • Font display: <link ... &display=swap>
  • Inline critical CSS if needed (nav, hero) — rest in <style>`
}

function buildUserPrompt(data: WizardData): string {
  const photos = getPhotosForIndustry(data.industry)

  const moodArtDirection: Record<string, string> = {
    professional: `
ART DIRECTION — PROFESSIONAL:
- Palette: dark navy (#0f172a) for hero bg and nav, pure white sections, brand color as accent only
- Hero: split layout — left side text on dark bg, right side hero image. h1 in white, bold.
- Features: clean rows (icon left + text right), not cards. Subtle left border in brand color.
- Section dividers: flat, clean. No gradients.
- Typography: tight letter-spacing on headings (-0.02em). IBM Plex Sans or "Plus Jakarta Sans" heading, Inter body.
- CTA section: deep navy background, white text, brand-colored button.
- Feel: boardroom-ready. Every element earns its place.`,
    bold: `
ART DIRECTION — BOLD:
- Palette: brand color fills entire hero background (full bleed). Black text on colored bg if light, white if dark.
- Hero: centered, massive h1 (clamp(3rem, 8vw, 6rem)), no image overlay — use a bold geometric SVG background pattern instead. Hero image displayed as a floating card/mockup beside the text.
- Features: 3-column card grid with thick top border in brand color, white cards, strong hover lift.
- Section accent: one section uses brand color as full background (white text).
- Typography: Extra Bold (800) headings, wide letter-spacing (0.05em) on labels.
- CTA: brand color bg, huge button, urgency copy.
- Feel: startup launch page. Energetic. Makes you want to click.`,
    warm: `
ART DIRECTION — WARM:
- Palette: warm cream (#faf7f2) page background, brand color accents, terracotta or amber tones.
- Hero: soft, welcoming. Hero image takes 50% of width (right side), text left. Rounded corners everywhere (--radius: 1.5rem).
- Features: cards with warm bg (#fff8f3), icon in colored pill, very rounded corners.
- Section dividers: use a subtle wave SVG (inline) between sections.
- Typography: friendly, humanist. "Nunito" or "DM Sans" headings, generous line-height (1.7).
- Testimonials: large quote mark (4rem, brand color, opacity 0.2), cards with warm shadow.
- CTA: warm gradient (brand color to slightly lighter), rounded pill button.
- Feel: like a recommendation from a trusted friend.
- For food/artisan businesses: the hero image should be prominently displayed (not just as background). Include an opening hours block as a dedicated section or card. Show the address clearly in the footer and contact section. The features section should present product categories beautifully — use food photography-style layout with large imagery.`,
    minimal: `
ART DIRECTION — MINIMAL:
- Palette: pure white (#ffffff) background, #111 text, brand color used sparingly (underlines, one button, one accent).
- Hero: no background image overlay. Place image below the fold or as a subtle backdrop at low opacity. Let the h1 dominate — enormous, black, tight.
- Layout: maximum whitespace. Sections have 120px+ vertical padding.
- Features: simple numbered list (01, 02, 03...) with large numbers in brand color, title, short description. No cards.
- Nav: no background, just the logo left and CTA right. Becomes sticky with thin border on scroll.
- Typography: very large h1 (clamp(3.5rem, 7vw, 6rem)), body text 1.1rem. "Playfair Display" or "Cormorant" heading, Inter body.
- CTA section: white background, huge centered text, one solid black button.
- Feel: Swiss design. Nothing unnecessary.`,
    luxury: `
ART DIRECTION — LUXURY:
- Palette: near-black (#0a0a0a) background for hero + nav. Off-white (#f5f0e8) for content sections. Brand color + gold (#c9a84c) as accents.
- Hero: full-bleed dark hero with hero image at low opacity (0.3) as overlay texture. h1 in off-white, extra-thin letter-spacing (0.08em), uppercase. Thin gold horizontal line above the h1.
- Features: alternating layout (image left/text right, then text left/image right). Each feature on its own row. Rich, spaced.
- Typography: "Cormorant Garamond" or "Playfair Display" heading (light weight 300, elegant), "Jost" or "Lato" body. Uppercase small-caps for labels.
- Borders: use 1px lines in gold/champagne (#c9a84c30) as decorative elements.
- CTA: dark section, thin-bordered button (not filled), hover fills with brand color.
- Feel: Hermès, Rolex, high-end hotel. Restrained and precious.`,
    creative: `
ART DIRECTION — CREATIVE:
- Palette: brand color as gradient starting point. Use 2-3 vibrant colors total. Don't be afraid of color.
- Hero: asymmetric layout. Large decorative text (business name at 10vw, very low opacity) as background element. Actual h1 overlaid. Hero image with clip-path: polygon() to create an interesting shape.
- Features: masonry-style or varied card sizes. Mix text cards with image cards. Play with rotation (transform: rotate(-1deg) on some cards).
- Decorative elements: large SVG blobs or circles behind sections using brand color at 0.1-0.2 opacity.
- Typography: expressive — mix font weights dramatically. h1 at 900 weight, subtitles at 300. "Syne" or "Space Grotesk" headings.
- Transitions: more visible hover effects. Scale(1.05) on cards.
- CTA: gradient background from brand color to complementary, white text, rounded pill button.
- Feel: Dribbble-worthy. Makes designers stop scrolling.`,
  }

  const fontPairs: Record<string, string> = {
    'modern-sans': 'Headings: "Plus Jakarta Sans" (weight 700, 800). Body: "Inter" (weight 400, 500). Import both from Google Fonts.',
    'elegant-serif': 'Headings: "Playfair Display" (weight 700). Body: "Lato" (weight 400). Import both from Google Fonts.',
    technical: 'Headings: "Space Grotesk" (weight 600, 700). Body: "DM Sans" (weight 400). Import both from Google Fonts.',
    humanist: 'Headings: "Nunito" (weight 700, 800). Body: "Open Sans" (weight 400). Import both from Google Fonts.',
  }

  const profile = getBusinessProfile(data.industry)

  const audienceAndOfferSection = profile === 'physical'
    ? `━━━ ÉTABLISSEMENT ━━━
Adresse: ${data.storeAddress || ''}
Horaires: ${data.openingHours || ''}
Zone / quartier: ${data.localArea || ''}
Ambiance: ${data.establishmentVibe || ''}
Clientèle habituelle: ${data.targetAudience || ''}

━━━ PRODUITS & SERVICES ━━━
Catégories: ${(data.productCategories || []).join(', ')}
Produits / plats signature: ${data.signatureProducts || ''}
Commandes sur mesure: ${data.customOrders ? 'Oui' : 'Non'}
Livraison / click & collect: ${data.deliveryOptions || 'Non précisé'}`
    : `━━━ AUDIENCE & POSITIONING ━━━
Target customer: ${data.targetAudience}
Their main frustration: ${data.mainProblem}
What they want: ${data.desiredOutcome}

━━━ OFFER ━━━
Product/Service name: ${data.offerName}
Description: ${data.offerDescription}
Key benefits (use these verbatim in features): ${data.keyBenefits.join(' · ')}
Differentiator: ${data.differentiator}
Price: ${data.pricePoint || 'Sur devis'}
Social proof numbers: ${data.socialProofStats || ''}`

  // Pick a layout variant based on businessName length to create natural variety
  const layoutVariants = ['SPLIT', 'DARK-FULL', 'OFFSET', 'EDITORIAL']
  const heroLayout = layoutVariants[data.businessName.length % 4]

  // Pick a feature layout variant
  const featureLayouts = ['alternating-rows', 'numbered-list', 'card-grid-2col', 'card-grid-3col']
  const featureLayout = featureLayouts[(data.businessName.length + data.industry.length) % 4]

  return `You are building a landing page. Follow the system prompt design rules exactly.

HERO LAYOUT TO USE: ${heroLayout}
FEATURE LAYOUT TO USE: ${featureLayout}

These layout choices are MANDATORY — they create variety across different businesses.

━━━ IMAGES (use ONLY these, no others) ━━━
Hero: ${photos[0]}
Secondary: ${photos[1] ?? photos[0]}
Background/CTA: ${photos[2] ?? photos[0]}

━━━ BUSINESS ━━━
Name: ${data.businessName}
Tagline: ${data.tagline || ''}
Industry: ${data.industry}
Location: ${data.location || 'France'}
Experience: ${data.yearsInBusiness ? data.yearsInBusiness + ' ans d\'expérience' : ''}

${audienceAndOfferSection}

━━━ VISUAL IDENTITY ━━━
Primary brand color: ${data.colorPreference}
Design mood + art direction:
${moodArtDirection[data.designMood] ?? moodArtDirection['professional']}

Typography: ${fontPairs[data.fontStyle] ?? fontPairs['modern-sans']}
Style references: ${data.brandReferences || 'Linear, Vercel, Stripe'}

━━━ CTA & CONTACT ━━━
Primary button text: "${data.ctaText}"
Button URL: ${data.ctaUrl || '#contact'}
Contact email: ${data.contactEmail}
Phone: ${data.phoneNumber || ''}
Awards / certifications: ${data.awards || ''}

━━━ COPY RULES (critical) ━━━
FORBIDDEN words and phrases — if you use any of these, the output is rejected:
"révolutionnaire", "innovant", "solution", "expérience", "passionate", "cutting-edge",
"state-of-the-art", "seamless", "leverage", "synergy", "empower", "game-changer",
"next level", "at the end of the day", "à votre service depuis", generic filler.

REQUIRED copy style:
• h1: ONE powerful sentence. Max 9 words. Starts with a verb or a specific result.
• Subheadline: 2-3 sentences. Speak to the exact frustration. Be specific.
• Feature/product titles: name the outcome, not the feature. "Livré en 48h" not "Livraison rapide".
• Testimonials: invent 3 realistic people. Each quote mentions a SPECIFIC result with a number or timeframe. Names and companies should feel French and local if the business is French. Natural phrasing — not marketing speak.
• Stats: invent 4 credible statistics that feel earned (e.g., "1 240 clients servis", "4.9/5 de satisfaction", "12 ans d'expérience", "98% de clients satisfaits").
• CTA copy: promise a specific outcome or remove a specific fear. Not just the button text — write the surrounding copy too.

━━━ FINAL INSTRUCTION ━━━
This page will be judged by a senior designer. It must look like it cost €5,000 to make.
Use the brand color boldly. Create visual surprise. Make the copy earn its space.
Output ONLY the complete HTML starting with <!DOCTYPE html>.`
}

export async function generateLandingPage(data: WizardData): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 10000,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: buildUserPrompt(data) }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  let html = content.text.trim()

  // Strip accidental markdown fences
  if (html.startsWith('```')) {
    html = html.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim()
  }

  // Inject a fallback footer if Claude omitted it
  if (!html.includes('<footer')) {
    const name = data.businessName
    const email = data.contactEmail
    const fallbackFooter = `
<footer style="background:#111;color:#aaa;padding:3rem 1.5rem;font-family:sans-serif;">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;">
    <div>
      <p style="color:#fff;font-weight:800;font-size:1.2rem;margin:0 0 .5rem;">${name}</p>
      <p style="margin:0;font-size:.875rem;">${data.tagline || ''}</p>
    </div>
    <div>
      <p style="color:#fff;font-weight:600;margin:0 0 1rem;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;">Navigation</p>
      <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem;font-size:.875rem;">
        <li><a href="#hero" style="color:#aaa;text-decoration:none;">Accueil</a></li>
        <li><a href="#features" style="color:#aaa;text-decoration:none;">Fonctionnalités</a></li>
        <li><a href="#testimonials" style="color:#aaa;text-decoration:none;">Témoignages</a></li>
        <li><a href="#contact" style="color:#aaa;text-decoration:none;">Contact</a></li>
      </ul>
    </div>
    <div>
      <p style="color:#fff;font-weight:600;margin:0 0 1rem;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;">Contact</p>
      <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem;font-size:.875rem;">
        ${email ? `<li><a href="mailto:${email}" style="color:#aaa;text-decoration:none;">${email}</a></li>` : ''}
        ${data.phoneNumber ? `<li><a href="tel:${data.phoneNumber}" style="color:#aaa;text-decoration:none;">${data.phoneNumber}</a></li>` : ''}
        ${data.storeAddress ? `<li style="color:#aaa;">${data.storeAddress}</li>` : ''}
      </ul>
    </div>
    <div>
      <p style="color:#fff;font-weight:600;margin:0 0 1rem;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;">Légal</p>
      <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem;font-size:.875rem;">
        <li><a href="#" style="color:#aaa;text-decoration:none;">Mentions légales</a></li>
        <li><a href="#" style="color:#aaa;text-decoration:none;">Politique de confidentialité</a></li>
        <li><a href="#" style="color:#aaa;text-decoration:none;">CGV</a></li>
      </ul>
    </div>
  </div>
  <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid #333;font-size:.8rem;text-align:center;">
    © 2025 ${name}. Tous droits réservés.
  </div>
</footer>`
    html = html.replace('</body>', fallbackFooter + '\n</body>')
  }

  // Remove markdown dashes used as bullet points inside HTML content
  // Pattern: ">- text" or "> - text" inside tags → strip the "- "
  html = html.replace(/(>)\s*-\s+/g, '$1')

  // Convert leftover "- item\n- item" blocks inside <p> or plain text to proper <ul><li>
  html = html.replace(/<p>((?:\s*-\s+.+\n?)+)<\/p>/g, (_match, block) => {
    const items = block
      .split('\n')
      .map((line: string) => line.replace(/^\s*-\s+/, '').trim())
      .filter(Boolean)
      .map((item: string) => `<li>${item}</li>`)
      .join('\n')
    return `<ul>${items}</ul>`
  })

  return html
}
