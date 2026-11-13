# Portfolio site

A plain HTML/CSS/JS portfolio — no build step — ready for GitHub Pages.

## Customize
1. Content is filled in from your résumé. Edit `index.html` to tweak wording, and uncomment the GitHub link in the Contact section once you know your username.
2. Add your résumé as `resume.pdf` in this folder (already included — replace it when you update your résumé).
3. Change the accent color in `style.css` → `--accent`.

## Publish on GitHub Pages
1. Sign in at github.com → **New repository**.
2. Name it **`your-username.github.io`** (exactly your username) → Public → Create.
3. Click **uploading an existing file**, drag in `index.html`, `style.css`, `script.js` (and `resume.pdf`) → **Commit changes**.
4. Go to **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
5. In a minute or two your site is live at `https://your-username.github.io`.

Using git instead:
```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

**Custom domain (optional):** Settings → Pages → Custom domain, then add a CNAME record at your DNS provider pointing to `your-username.github.io`.
