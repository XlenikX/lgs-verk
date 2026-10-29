#!/usr/bin/env python3
"""Build the public project catalogue from photo folders. Standard library only."""
import argparse
import json
from pathlib import Path
from urllib.parse import quote

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'}


def localized(value, default=''):
    if value is None:
        return {'is': default, 'en': default}
    if isinstance(value, str):
        return {'is': value, 'en': value}
    if not isinstance(value, dict) or any(not isinstance(v, str) for v in value.values()):
        raise ValueError('Titles and descriptions must be text or an object with is/en text.')
    return {'is': value.get('is', value.get('en', default)),
            'en': value.get('en', value.get('is', default))}


def build_projects(site_root):
    folder_root = site_root / 'assets/images/projects'
    projects = []
    if folder_root.exists():
        for folder in sorted(folder_root.iterdir(), key=lambda p: p.name.casefold()):
            if not folder.is_dir() or folder.name.startswith('.'):
                continue
            if folder.is_symlink():
                raise ValueError(f'Project folders cannot be symlinks: {folder.name}')
            images = sorted((p for p in folder.iterdir() if p.is_file() and not p.name.startswith('.')
                             and p.suffix.lower() in IMAGE_EXTENSIONS), key=lambda p: p.name.casefold())
            if not images:
                continue
            if any(p.is_symlink() for p in images):
                raise ValueError(f'Project photos cannot be symlinks: {folder.name}')
            metadata_path = folder / 'project.json'
            metadata = json.loads(metadata_path.read_text(encoding='utf-8')) if metadata_path.exists() else {}
            if not isinstance(metadata, dict):
                raise ValueError(f'{metadata_path}: expected a JSON object')
            title = localized(metadata.get('title'), folder.name.replace('-', ' ').replace('_', ' ').capitalize())
            description = localized(metadata.get('description'))
            cover = metadata.get('cover', images[0].name)
            if not isinstance(cover, str) or cover not in [p.name for p in images]:
                raise ValueError(f'{folder.name}: cover must match a photo filename in this folder.')
            images.sort(key=lambda p: p.name != cover)
            projects.append({'id': folder.name, 'title': title, 'description': description,
                             'images': ['./' + quote(p.relative_to(site_root).as_posix(), safe='/') for p in images]})
    target = site_root / 'data/projects.json'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return projects


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site-root', type=Path, default=Path(__file__).resolve().parents[1] / 'dist')
    args = parser.parse_args()
    try:
        projects = build_projects(args.site_root.resolve())
    except (ValueError, OSError) as error:
        parser.exit(1, f'Project catalogue error: {error}\n')
    print(f'Built catalogue: {len(projects)} projects, {sum(len(p["images"]) for p in projects)} photos.')
