# Repository Technical Manual

This repository is a zero framework personal engineering portfolio designed for rapid canvas deployment on GitHub Pages. It relies entirely on native semantic web primitives.

## Maintenance Workflows

### 1. Adding a Technical Project Description Page
To document a new engineering build with system whitepapers:
1. Create a fresh file inside the `projects/` directory (e.g., `projects/my-new-engine.html`).
2. Copy the template layout from `projects/kv-store.html`.
3. Verify that your top stylesheet tracking link includes the directory look-back dot notation: `<link rel="stylesheet" href="../style.css">`.
4. Open `projects.html` at the repository root and append a matching project summary component block.

### 2. Publishing a Blog Entry
To publish a new technical log entry:
1. Create a fresh file inside the `blog/` folder (e.g., `blog/compiler-notes.html`).
2. Ensure the code syntax highlighting scripts are loaded before the closing body tag.
3. Open `blog.html` at your repository root and add your new row to the chronological log array.
4. Open `feed.xml` at your root directory and push an extra `<item>` block containing the update details to the top of the RSS array tree.

### 3. Editing Shared Header or Footer Elements
Never modify header or footer rows directly inside individual HTML pages.