# Adding projects and photos

You can add photos directly in GitHub without editing the website's HTML.

## Create the first project folder

1. Open the repository and go to `dist/assets/images/projects`.
2. Choose **Add file → Create new file**.
3. Enter `bathroom-renovation/project.json` as the filename. Replace `bathroom-renovation` with a short name for your project; use one folder per project.
4. Paste this example and replace the sample text with the real project details:

```json
{
  "title": {
    "is": "Titill verkefnis",
    "en": "Project title"
  },
  "description": {
    "is": "Lýsing á því hvað var gert.",
    "en": "Describe the work that was carried out."
  }
}
```

5. Commit the file to `main`.
6. Open the new project folder. Choose **Add file → Upload files**, drag in your project photos, and commit to `main`.
7. Wait for **Deploy LGS Verk website** to finish in the **Actions** tab. Refresh the website to see your project.

A project with no photos stays hidden. When uploading from a computer using Git, the description file is optional: a folder containing just photos is enough.

## Photo order and cover

Use filenames such as `01-before.jpg`, `02-during.jpg`, and `03-after.jpg`. Images are sorted alphabetically. The first image is used as the card cover.

To choose a different cover, add a `cover` property to `project.json` with the exact filename:

```json
{
  "title": {"is": "Titill verkefnis", "en": "Project title"},
  "description": {"is": "Lýsing á verkinu.", "en": "Description of the work."},
  "cover": "03-after.jpg"
}
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, and `.gif`. Place the photos directly inside the project folder. For faster loading, resize large camera photos before uploading; around 1600–2400 pixels wide is generally ample for this gallery.

## Add more photos or another project

Upload more photos into the existing project folder to expand its gallery. Create another folder for a new project. Removing an image from its folder also removes it from the gallery at the next deployment. If you remove a custom cover image, update or remove the `cover` property too.

## Text and layout

- Edit `dist/data/translations.json` for general Icelandic (`is`) and English (`en`) website copy.
- Edit a project's `project.json` for its title and description.
- Edit `dist/assets/css/styles.css` for appearance.
- Edit `dist/index.html` for page structure.

Do not manually edit `dist/data/projects.json`: deployment regenerates it from your photo folders. Uploaded photos and their descriptions are public on the website. Use images you are allowed to publish, and remove private details first.

