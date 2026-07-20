# Suhasini — QA Automation Engineer Portfolio

A professional, multi-page portfolio website built with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build step. Just upload and host free on GitHub Pages.

---

## ✨ Features

- **Five pages**: Home, About, Experience, Projects, Contact
- **Sticky shared navigation** with automatic active-page highlighting and smooth scrolling
- **Dark / light mode toggle** (remembers your choice for the session; also follows your OS preference on first load)
- **Fully responsive** with a working mobile hamburger menu
- **Scroll-reveal animations**, hover effects, and an animated skills section
- **Grouped skill tags** + a "Currently Learning / 2026-Ready" section with **Learning** badges
- **Timeline** work-history layout
- **Case-study project cards** (problem → approach → tools → impact)
- **Certifications** section with editable placeholders
- **Contact form** with front-end validation (no backend required)
- **Accessible**: semantic HTML, alt text, keyboard navigation, focus styles, skip link, and reduced-motion support

---

## 📁 File Structure

```
qa-portfolio/
├── index.html          # Home / hero
├── about.html          # Bio, grouped skills, animated bars, "Currently Learning"
├── experience.html     # Work-history timeline
├── projects.html       # Case studies + certifications
├── contact.html        # Contact form + social links
├── styles.css          # Shared stylesheet (all theming via CSS variables)
├── script.js           # Shared JS (theme, menu, reveal, skill bars, form)
├── README.md           # This file
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── assets/
│   ├── profile-placeholder.svg   # Placeholder avatar (replace with a real photo)
│   └── favicon.svg               # Site icon
└── resume/
    └── README.txt      # Drop Suhasini-Resume.pdf here
```

---

## 🖊️ How to Customize (placeholders)

All editable text is marked in the code with `EDIT:` comments and `[BRACKETED]` placeholders.
Do a **Find & Replace across all `.html` files** for each of these:

| Placeholder  | Replace with                          | Example                                   |
|--------------|---------------------------------------|-------------------------------------------|
| `[FULL NAME]`| Her full name                         | `Suhasini Rao`                            |
| `[EMAIL]`    | Contact email                         | `suhasini@example.com`                    |
| `[PHONE]`    | Phone number                          | `+1 (555) 123-4567`                       |
| `[LOCATION]` | City, State                           | `Boston, MA`                              |
| `[LINKEDIN]` | Full LinkedIn URL                     | `https://linkedin.com/in/suhasini`        |
| `[GITHUB]`   | Full GitHub URL                       | `https://github.com/suhasini`             |

> Tip: In VS Code press `Ctrl/Cmd + Shift + F`, type the placeholder, and "Replace All".

### Add her photo
1. Save the photo as `assets/profile.jpg`.
2. In `index.html` and `about.html`, change:
   ```html
   <img src="assets/profile-placeholder.svg" ...>
   ```
   to:
   ```html
   <img src="assets/profile.jpg" ...>
   ```
3. Update the `alt` text if you like.

### Add her resume
Drop the PDF into `resume/` named `Suhasini-Resume.pdf` (see `resume/README.txt`).
The "Download Resume" buttons already point there.

### Update certifications
In `projects.html`, find the **Certifications** section. Change the ISTQB status from
`Planned` to `Certified` once earned, and duplicate a `.cert` block for each new credential.

### Make the contact form actually send email (optional)
The form validates in the browser and shows a confirmation, but does **not** send email by default
(a static site can't send mail on its own). To make it live, use a free service:
- **Formspree**: set `<form action="https://formspree.io/f/XXXX" method="POST">` in `contact.html`.
- **EmailJS**: wire it up inside `script.js`.

---

## 🚀 Deploy to GitHub Pages (free)

1. **Create a new repository** on GitHub (e.g. `suhasini-portfolio`). Keep it **Public**.
2. **Upload every file** in this folder to the repo (drag-and-drop in the GitHub web UI works, or use `git`).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait ~1 minute. Your site goes live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

That's it — every push to `main` republishes automatically.

### Optional: using git from the command line
```bash
cd qa-portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## 🛠️ Tech

Plain HTML5, CSS3 (custom properties for theming, Flexbox & Grid), and vanilla JavaScript
(IntersectionObserver for reveals). Fonts: **Poppins** + **Inter** via Google Fonts. No dependencies, no build tools.
