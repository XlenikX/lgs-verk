# LGS Verk

Icelandic / English contractor website with a project photo gallery.

## Edit the website

| File or folder | Purpose |
| --- | --- |
| `dist/index.html` | Page structure and sections |
| `dist/assets/css/styles.css` | Colours, spacing, and responsive layout |
| `dist/assets/js/app.js` | Language switch and project photo viewer |
| `dist/data/translations.json` | Icelandic and English website text |
| `dist/assets/images/projects/` | Project folders and photos — upload your images here |
| `scripts/build_projects.py` | Automatically generates the project catalogue |
| `dist/data/projects.json` | Generated catalogue; do not edit manually |
| `.github/workflows/jekyll-gh-pages.yml` | Builds the catalogue and publishes `dist/` to GitHub Pages |

## Add project photos

1. Create a folder under `dist/assets/images/projects/`, for example `bathroom-renovation`.
2. Upload the project's JPG, PNG, WebP, AVIF, or GIF images into that folder.
3. Commit to `main`. GitHub automatically rebuilds the gallery and publishes the site.

The folder name becomes the project title. Photos appear in filename order, with the first used as the cover. Add an optional `project.json` in the folder for bilingual titles, a description, and a chosen cover image.

See [the step-by-step photo upload guide](docs/ADDING-PROJECTS.md) and [example metadata](docs/project.example.json).

## Preview locally

Run these commands from the repository folder:

```sh
python scripts/build_projects.py
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Use the local server rather than opening the HTML file directly, because the site loads its text and project catalogue from JSON files.

No npm packages or third-party Python packages are required. Python 3 is used only to build the gallery; the published website is entirely static.

## Publishing

Changes pushed to `main` automatically publish the contents of `dist/` through GitHub Pages. The deployment does not publish this README as the homepage. Watch the **Actions** tab for deployment status.

Current GitHub Pages address: https://xlenikx.github.io/lgs-verk/

The intended custom domain is `www.lgsverk.is`; manage its connection separately in GitHub Pages settings and DNS.

The `.openai/hosting.json` file retains the earlier ChatGPT Sites project identity. GitHub deployments do not update that separate preview automatically.

## Content still to add

Confirm service details, the working process, and contact information, then upload real project photos. The gallery displays a clear empty state until photos are added. The hero illustration is labelled as an illustration.

