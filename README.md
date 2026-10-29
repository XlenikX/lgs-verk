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

Upload the contents of `dist/` to a static web host. `.openai/hosting.json` retains the configuration for the existing ChatGPT Sites draft:

https://lgs-verk.chirpy-iris-8724.chatgpt.site

That draft currently has private access. This GitHub repository does not automatically deploy changes to it. The custom domain `www.lgsverk.is` has not yet been connected, and GitHub Pages has not been enabled.
