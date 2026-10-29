# Aryan Soni — Portfolio

A responsive, dependency-free portfolio site (plain HTML, CSS and JavaScript). No build step is needed.

## Project structure

```
aryan-portfolio/
├── index.html              # All sections, SEO + social metadata, icon sprite
├── styles.css          # Design tokens (light/dark), layout, components, responsive rules
├── main.js              # CONFIG, theme toggle, nav, reveal
├── 
│   ├── attendance-system.jpg
│   ├── Aryan_Soni_Resume.pdf   # full resume, linked from the viewer's "Open PDF" button
│   ├── resume-preview.jpg      # image shown in the "View Resume" popup
│   ├── favicon.svg
│   └── og-image.png            # 1200x630 social preview image
└── README.md
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
cd aryan-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Add your links (main.js → CONFIG)

Buttons stay hidden until a valid `https://` URL is set:

| Key              | What it enables                                  |
| ---------------- | ------------------------------------------------ |
| `github`         | GitHub icon in the footer                        |
| `projectRepo`    | "View Code" button on the featured project       |
| `projectDemo`    | "Live Demo" button on the featured project       |
| `certHackathon`  | "View certificate" link on Smart Synergy         |
| `certConference` | "View certificate" link on RAEMPS                |

## Resume

"View Resume" opens your resume in a popup on the page, with an "Open PDF" button for the full file. If you update your resume, replace both `Aryan_Soni_Resume.pdf` and `resume-preview.jpg` (a picture of page 1).

## Contact

The contact section lists your email, phone and LinkedIn, with an "Email Me" button. There is no contact form.

## Deploy

**GitHub Pages**
1. Push this folder's contents to a GitHub repository.
2. Repository → Settings → Pages → Deploy from branch → `main` / root.

**Vercel**
1. Import the repository at vercel.com/new.
2. Framework preset: "Other". Leave build command and output directory empty.

**After deploying:** change the two `og-image.png` URLs in `index.html` (`og:image`, `twitter:image`) to
absolute URLs, e.g. `https://your-site.com/og-image.png`. Social platforms require absolute image URLs.
Optionally add `<link rel="canonical" href="https://your-site.com/" />`.

## Content notes

- OpenCV appears in your skills and hero badges, but is not listed as a project technology because the resume
  doesn't say the attendance system uses it. Add `<li>OpenCV</li>` to the project's tag list if it does.
- The project image (`attendance-system.jpg`) is an edited version of a real capture: the face inside the detection box is replaced with a blurred crop of your face and the label reads "Aryan Soni". The caption describes it as recognition output, not an unedited screenshot.
- Phone link assumes an Indian number (`+91`).
