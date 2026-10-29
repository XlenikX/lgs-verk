/* Layout: index.html · text: data/translations.json · projects: data/projects.json */
const languageButton = document.getElementById('language');
const projectList = document.getElementById('project-list');
const emptyState = document.getElementById('projects-empty');
const errorMessage = document.getElementById('projects-error');
const dialog = document.getElementById('project-dialog');
const galleryImage = document.getElementById('gallery-image');
let language = 'is';
let translations = {};
let projects = [];
let activeProject = null;
let photoIndex = 0;
let lastTrigger = null;
let loadFailed = false;

try { language = localStorage.getItem('lgs-language') === 'en' ? 'en' : 'is'; } catch (_) {}
const text = key => translations[language]?.[key] || translations.is?.[key] || key;
const localized = value => value?.[language] || value?.is || value?.en || '';

function setLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i]').forEach(element => {
    if (translations[language]?.[element.dataset.i]) {
      element.innerHTML = translations[language][element.dataset.i];
    }
  });
  languageButton.textContent = language === 'is' ? 'EN ↗' : 'IS ↗';
  languageButton.setAttribute('aria-label', language === 'is' ? 'Switch to English' : 'Skipta yfir á íslensku');
  document.title = language === 'is' ? 'LGS Verk — Frá hugmynd að verki' : 'LGS Verk — From an idea to a job well done';
  document.getElementById('gallery-close').setAttribute('aria-label', text('galleryclose'));
  document.getElementById('gallery-previous').setAttribute('aria-label', text('previous'));
  document.getElementById('gallery-next').setAttribute('aria-label', text('next'));
  errorMessage.textContent = text('galleryerror');
  document.getElementById('photo-error').textContent = text('photofailed');
  renderProjects();
  if (activeProject) renderGallery();
}

function renderProjects() {
  projectList.replaceChildren();
  emptyState.hidden = projects.length > 0 || loadFailed;
  errorMessage.hidden = !loadFailed;
  projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'project';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-button';
    button.setAttribute('aria-label', `${text('galleryopen')}: ${localized(project.title)}`);
    const image = document.createElement('img');
    image.className = 'project-cover';
    image.src = project.images[0];
    image.alt = localized(project.title);
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => { image.classList.add('image-unavailable'); });
    const body = document.createElement('div');
    body.className = 'project-body';
    const title = document.createElement('h3');
    title.textContent = localized(project.title);
    const description = document.createElement('p');
    description.textContent = localized(project.description);
    description.hidden = !description.textContent;
    const label = document.createElement('span');
    label.className = 'project-action';
    label.textContent = `${text('galleryopen')} · ${project.images.length} ${text(project.images.length === 1 ? 'photo' : 'photos')} ↗`;
    body.append(title, description, label);
    button.append(image, body);
    button.addEventListener('click', () => {
      activeProject = project;
      photoIndex = 0;
      lastTrigger = button;
      renderGallery();
      dialog.showModal();
      document.body.classList.add('gallery-open');
      document.getElementById('gallery-close').focus();
    });
    article.append(button);
    projectList.append(article);
  });
}

function renderGallery() {
  const title = localized(activeProject.title);
  galleryImage.src = activeProject.images[photoIndex];
  galleryImage.alt = `${title} — ${photoIndex + 1} / ${activeProject.images.length}`;
  galleryImage.hidden = false;
  document.getElementById('photo-error').hidden = true;
  document.getElementById('gallery-title').textContent = title;
  document.getElementById('gallery-description').textContent = localized(activeProject.description);
  document.getElementById('gallery-counter').textContent = `${photoIndex + 1} / ${activeProject.images.length}`;
  for (const id of ['gallery-previous', 'gallery-next']) {
    document.getElementById(id).hidden = activeProject.images.length < 2;
  }
  const thumbnails = document.getElementById('gallery-thumbnails');
  thumbnails.replaceChildren();
  activeProject.images.forEach((src, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `${text('photo')} ${index + 1}`);
    button.setAttribute('aria-pressed', String(index === photoIndex));
    const image = document.createElement('img');
    image.src = src;
    image.alt = '';
    image.loading = 'lazy';
    button.append(image);
    button.addEventListener('click', () => { photoIndex = index; renderGallery(); });
    thumbnails.append(button);
  });
}

function movePhoto(direction) {
  if (!activeProject) return;
  photoIndex = (photoIndex + direction + activeProject.images.length) % activeProject.images.length;
  renderGallery();
}

languageButton.addEventListener('click', () => {
  language = language === 'is' ? 'en' : 'is';
  try { localStorage.setItem('lgs-language', language); } catch (_) {}
  setLanguage();
});
document.getElementById('gallery-close').addEventListener('click', () => dialog.close());
document.getElementById('gallery-previous').addEventListener('click', () => movePhoto(-1));
document.getElementById('gallery-next').addEventListener('click', () => movePhoto(1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('gallery-open');
  activeProject = null;
  lastTrigger?.focus();
});
galleryImage.addEventListener('error', () => {
  galleryImage.hidden = true;
  document.getElementById('photo-error').hidden = false;
});

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

async function initialize() {
  const results = await Promise.allSettled([
    loadJSON('./data/translations.json'),
    loadJSON('./data/projects.json')
  ]);
  if (results[0].status === 'fulfilled') translations = results[0].value;
  else {
    languageButton.disabled = true;
    console.error('Translations could not be loaded.');
  }
  if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) {
    projects = results[1].value.filter(project => Array.isArray(project.images) && project.images.length);
  } else loadFailed = true;
  setLanguage();
}
initialize();
