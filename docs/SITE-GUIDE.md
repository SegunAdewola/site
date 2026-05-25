# segunadewola.com - Site Management Guide

This is the single source of truth for managing and updating `segunadewola.com`. The site is a zero-framework static portfolio deployed on GitHub Pages.

---

## Table of Contents

- [Repository Structure](#repository-structure)
- [How the Header and Footer Work](#how-the-header-and-footer-work)
- [Adding a Project](#adding-a-project)
- [Adding a Blog Post](#adding-a-blog-post)
- [Updating the Sitemap](#updating-the-sitemap)
- [Updating the RSS Feed](#updating-the-rss-feed)
- [Updating Contact Details](#updating-contact-details)
- [Editing the Nav or Footer Links](#editing-the-nav-or-footer-links)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [File Ownership Map](#file-ownership-map)

---

## Repository Structure

```
├── index.html              # Homepage
├── projects.html           # Projects listing page
├── blog.html               # Blog listing page
├── contact.html            # Contact page
├── 404.html                # Custom 404 page
├── style.css               # All styles, single file
├── sitemap.xml             # Search engine sitemap
├── feed.xml                # RSS feed
├── robots.txt              # Crawler rules
├── favicon.ico             # Browser tab icon
├── manifest.json           # PWA manifest
├── CNAME                   # Custom domain config for GitHub Pages
├── humans.txt              # humanstxt.org convention
├── security.txt            # Moved to /.well-known/security.txt
│
├── assets/
│   ├── js/main.js          # Header and footer injection, nav logic
│   ├── images/             # Favicons and OG images
│   └── documents/          # Resume PDF and other downloadable files
│
├── blog/                   # Individual blog post pages
│   └── *.html
│
├── projects/               # Individual project detail pages
│   └── *.html
│
├── docs/                   # Internal documentation (not served publicly)
│   └── SITE-GUIDE.md       # This file
│
└── .well-known/
    └── security.txt        # Security contact info per RFC 9116
```

---

## How the Header and Footer Work

The header and footer are **not** written in each HTML file. They are injected by `assets/js/main.js` at runtime into the `#global-header` and `#global-footer` elements that every page contains.

**To update a nav link or footer text, edit only `assets/js/main.js`.** Changes there propagate to every page automatically.

Pages inside `blog/` or `projects/` subdirectories use a `../` prefix automatically. The script detects the path and adjusts all links. You do not need to think about this when adding new pages inside those folders.

---

## Adding a Project

**Step 1 - Create the detail page**

Copy `projects/kv-store.html` and rename it inside the `projects/` folder:

```
projects/my-new-project.html
```

Update the `<title>`, page heading, and all content. The stylesheet path `../style.css` is already correct for subdirectory pages.

**Step 2 - Add a card to `projects.html`**

Open `projects.html` and copy an existing `item-card` block. Update the title, description, links, and tags. Add it above the existing cards so the newest project appears first.

**Step 3 - Update the sitemap**

Add a new `<url>` entry to `sitemap.xml` for both `projects.html` (update `<lastmod>`) and the new detail page. See [Updating the Sitemap](#updating-the-sitemap).

---

## Adding a Blog Post

**Step 1 - Create the post page**

Copy an existing file from the `blog/` folder and rename it:

```
blog/my-new-post.html
```

Update the `<title>`, heading, date, and content. The stylesheet path `../style.css` is already correct.

**Step 2 - Add a card to `blog.html`**

Open `blog.html` and copy an existing `item-card` block. Add the new post at the top of the list so the newest entry appears first.

**Step 3 - Update the RSS feed**

Open `feed.xml` and add a new `<item>` block at the top of the channel, above all existing items. Use the exact permalink as both `<link>` and `<guid>`. See [Updating the RSS Feed](#updating-the-rss-feed).

**Step 4 - Update the sitemap**

Add a `<url>` entry for the new post page and update the `<lastmod>` on `blog.html`. See [Updating the Sitemap](#updating-the-sitemap).

---

## Updating the Sitemap

`sitemap.xml` lives at the root. Update it whenever you add or significantly change a page.

- Update `<lastmod>` on any page you changed, using `YYYY-MM-DD` format.
- Add new `<url>` blocks for any new pages.
- Do not add pages that are stubs or drafts.
- `priority` is a hint to crawlers, not a guarantee. Use `1.0` for the homepage, `0.8-0.9` for main sections, `0.6-0.7` for individual posts and project pages.

---

## Updating the RSS Feed

`feed.xml` lives at the root. It is a valid RSS 2.0 feed. Update it every time you publish a new blog post.

- Always add the new `<item>` at the **top** of the channel, above all other items.
- The `<guid>` must be the full permalink URL and must be unique across all items.
- Use `isPermaLink="true"` on the `<guid>` element.
- `<pubDate>` must follow RFC 822 format: `Thu, 04 Jun 2026 00:00:00 GMT`.

---

## Updating Contact Details

Open `contact.html` and update the email and any other links directly in the HTML. This is a static page with no injection logic.

Also check `assets/js/main.js` if you need to update the LinkedIn or GitHub links in the nav - those live there, not in each HTML file.

---

## Editing the Nav or Footer Links

Open `assets/js/main.js`. The header and footer HTML strings are inline template literals inside the `DOMContentLoaded` callback.

- Nav links are inside the `headerElement.innerHTML` template.
- Footer content is inside the `footerElement.innerHTML` template.

Changing either one updates every page on the site.

---

## Deploying to GitHub Pages

The site deploys automatically when you push to the `main` branch. GitHub Pages serves the root of the repo directly.

A few things that must stay in place for deployment to work:

- `CNAME` in the root must contain exactly `segunadewola.com` with no trailing whitespace.
- `404.html` in the root is automatically picked up by GitHub Pages for missing routes.
- Do not add a Jekyll config or `_config.yml` unless you intentionally want Jekyll processing. This site is plain HTML and should stay that way.

---

## File Ownership Map

| File | What owns it | Edit directly? |
|---|---|---|
| `style.css` | All pages | Yes |
| `assets/js/main.js` | Nav and footer on all pages | Yes |
| `sitemap.xml` | SEO and crawler discovery | Yes, manually |
| `feed.xml` | RSS readers | Yes, manually |
| `CNAME` | GitHub Pages custom domain | Only to change domain |
| `.well-known/security.txt` | Security contact info | Yes |
| `robots.txt` | Crawler access rules | Yes |
| `manifest.json` | PWA metadata | Yes |
