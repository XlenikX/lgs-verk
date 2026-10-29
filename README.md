# LGS Verk

Bilingual Icelandic / English website for LGS Verk, intended for `www.lgsverk.is`.

## Website

The complete static website is in `dist/index.html`, including its CSS, JavaScript, translations, and SVG illustration. No package installation or build step is required.

The draft includes service, previous-project, working-process, and contact sections. Service details, completed projects, project photos, and contact information still need to be supplied and confirmed. Illustrations and placeholder projects are clearly labelled.

## Preview locally

Open `dist/index.html` in a browser, or run:

```sh
python -m http.server 8000 --directory dist
```

Then visit `http://localhost:8000`.

## Edit

- Edit Icelandic content in the HTML elements with `data-i` attributes.
- Edit corresponding English translations in the `en` object inside the script.
- Edit styles in the `<style>` element.
- Replace illustrative project placeholders with actual project photos and descriptions before customer launch.

## Hosting

GitHub Pages deploys automatically when changes are pushed to `main`. The workflow in `.github/workflows/jekyll-gh-pages.yml` uploads only `dist/`, so `dist/index.html` becomes the live homepage. No Jekyll build is needed. The workflow can also be run manually from the Actions tab.

For another static host, upload the contents of `dist/`.

`.openai/hosting.json` retains the configuration for the existing ChatGPT Sites draft:

https://lgs-verk.chirpy-iris-8724.chatgpt.site

That draft currently has private access. This GitHub repository does not automatically deploy changes to it. The intended custom domain is `www.lgsverk.is`; custom-domain configuration is managed separately in GitHub Pages settings and DNS.
