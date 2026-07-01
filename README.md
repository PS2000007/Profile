# Prasad Suryavanshi — Portfolio

A modern, animated, glassmorphism portfolio site. **Pure static** — plain HTML, CSS and
JavaScript with **no build step and no server**. It runs by just opening `index.html`,
and deploys to any free static host by **drag-and-drop (no Git required)**.

---

## Files to deploy

Upload **all of these together** (keep them in the same folder):

| File | Purpose |
|------|---------|
| `index.html` | The page (open this) |
| `style.css` | All styling |
| `app.js` | All animations & logic |
| `config.js` | **Your content** — edit this to change anything |
| `favicon.svg` | Browser tab icon |
| `robots.txt` | Search-engine hint |
| `Prasad_Suryavanshi_Resume.pdf` | Downloadable résumé (Resume button) |

> Everything else in this folder (`.git`, `.code-review-graph`, this README) is **not**
> needed on the live site — you can skip it when uploading.

The animation libraries (GSAP, Lenis) and Google Fonts load from public CDNs, so the
live site needs an internet connection but **no install**.

---

## Free hosting — no Git, no command line

Pick any one. All are free and give you an HTTPS link in ~1 minute.

### 1. Netlify Drop  *(easiest)*
1. Go to **https://app.netlify.com/drop**
2. **Drag this whole folder** onto the page.
3. You get a live URL instantly (e.g. `your-name.netlify.app`).
4. To update later, drag the folder again. You can also rename the site / add a custom
   domain for free in the site settings.

### 2. Cloudflare Pages — Direct Upload
1. Go to **https://pages.cloudflare.com** → *Create a project* → **Upload assets**.
2. Drag the folder (or a `.zip` of it) and **Deploy**.
3. Live at `your-project.pages.dev`.

### 3. Tiiny.host
1. Go to **https://tiiny.host**.
2. Zip the folder, drag the `.zip` in, and publish. Free subdomain included.

### 4. GitHub Pages *(web upload — still no Git tools)*
1. Create a free GitHub account → **New repository** → name it `your-username.github.io`.
2. **Add file → Upload files**, drag all the files in, **Commit**.
3. **Settings → Pages →** Branch: `main` / `root` → Save.
4. Live at `https://your-username.github.io` in a minute or two.

---

## Editing your content

Open **`config.js`** — everything (name, roles, bio, skills, experience, projects,
education, certifications, contact details, colors) lives in the `CONFIG` object.
No other file needs editing for content changes. Save, re-upload, done.

- **Contact form** delivers via WhatsApp or Email (visitor picks). Change where it goes
  by editing `personal.phone` and `personal.email` in `config.js`.
- **Resume button** opens `Prasad_Suryavanshi_Resume.pdf` in a new tab. To swap the file,
  replace it (keep the same name) or update `personal.resume`.

---

## Local preview / run it on your machine

**Just double-click `host.bat`.** It starts a tiny local web server (no downloads —
uses the bundled `server.js`) and opens the site in your browser at
`http://localhost:3000`. Keep the window open; press **Ctrl+C** to stop.

- Needs Node.js installed (already set up here). If Node isn't found, `host.bat`
  falls back to opening `index.html` directly.
- Prefer no auto-open? Run `set NO_OPEN=1` before `node server.js`.

You can also just double-click `index.html`, but the local server is closer to how it
behaves once hosted (correct file types, clean paths).

> Note: `host.bat` / `server.js` are only for **running it on your own computer**. They
> are **not needed** on the live site — for the internet, use the drag-and-drop hosts above.
