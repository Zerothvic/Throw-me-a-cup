# Throw Me a Cup

A static, single-page website for **Throw Me a Cup**, a nonprofit focused on clean water access — funding filtration systems, research, and community education.

No framework, no build step. Just `index.html`, `TMAC.css`, and `TMAC.js`.

## Project structure

```
.
├── index.html          # All page markup and content
├── TMAC.css             # All styling
├── TMAC.js              # Nav, search, slider, and scroll-animation behavior
├── images/               # Logos, community photos, staff photos, project photos
└── videos/               # Hero/intro video
```

The page is a single HTML document with five anchored sections, navigated via in-page links:

| Section | Anchor | Content |
|---|---|---|
| Home | `#home` | Intro copy, community image slider, embedded video |
| About | `#about` | Mission cards (Problem / Solution / Vision), team cards |
| Projects | `#projects` | Current initiatives |
| Donate | `#donate` | Donation form, running total, donor list |
| Contact | `#contact` | Contact form, contact info cards |

## Design approach

- **Mobile-first CSS.** Base styles target small screens; layout progressively enhances at three breakpoints: `640px`, `900px`, and `1200px`.
- **Design tokens.** Colors, fonts, spacing, and radii are defined once as CSS custom properties in `:root` at the top of `TMAC.css` — change a token there to restyle the whole site.
- **Fluid type & layout.** Headings and section spacing use `clamp()` so text and whitespace scale smoothly between breakpoints instead of jumping at fixed sizes. Card grids use CSS Grid with explicit column counts per breakpoint (2-up on tablets, 3–5-up on desktop depending on section).
- **Hero background.** The hero image is a real `<img>` element (not a CSS `background-image`) with a gradient overlay layered on top. This avoids an issue where some mobile browsers' data-saver modes strip CSS background images but never touch `<img>` tags.
- **No build tooling.** Everything is plain HTML/CSS/JS so the site can be opened directly in a browser or hosted on any static file host with zero setup.

### Fonts

| Role | Font |
|---|---|
| Hero display text | Luckiest Guy |
| Section headings | Yeseva One |
| Nav / buttons / labels | Federo |
| Body text | Noto Sans |

Loaded from Google Fonts via `<link>` tags in `index.html`. Icons are from Font Awesome, loaded via a kit script tag.

## JavaScript behavior (`TMAC.js`)

- **Burger menu** — toggles the mobile nav panel, syncs `aria-expanded`, closes on outside click, link click, `Escape`, or resize back to desktop width.
- **Search bars** — adds an `open` class on focus for styling hooks (header and footer search share the same behavior).
- **Image slider** — cycles through community photos automatically every 5 seconds; clicking a thumbnail jumps to that image and restarts the timer.
- **Scroll animations** — elements with `.animate-fadeInUp` / `.animate-scaleIn` fade/scale into view as they enter the viewport, and respect `prefers-reduced-motion`.

## Running locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g.:
  ```
  python3 -m http.server
  ```
  then visit `http://localhost:8000`.

## Browser support

Built on standard, well-supported CSS (Grid, `clamp()`, custom properties) and vanilla JS — works in all current major browsers. No polyfills included for older browsers (e.g. IE11).

## Known considerations

- **Project images render at their natural aspect ratio** (no cropping), so project cards may vary slightly in height depending on each image's dimensions.
- Donation and contact forms are front-end only — no backend/payment processing is wired up. Connect them to a real payment processor and form handler before going live.
- Social links, "Sign Up"/"Sign In" buttons, and the newsletter form are placeholders (`href="#"` / no submit handler) pending real destinations.

## Credits

- Video: "The World's Water Crisis" — TED-Ed, lesson by Christiana Z. Peppard, animation by Jeremy Collins.
- Icons: Font Awesome.
