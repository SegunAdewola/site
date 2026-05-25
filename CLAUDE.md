# CLAUDE.md

This file tells Claude how to work on this repository.

## What this repo is

A zero-framework personal portfolio site for Segun Adewola, deployed on GitHub Pages at `segunadewola.com`. No build step, no bundler, no framework. Plain HTML, one CSS file, one JS file.

## Personality and tone

All copy on this site should sound like Segun: warm, direct, technically sharp, and easy to root for. He is a graduate student and software engineer who is genuinely excited about distributed systems, compilers, databases, and building products that solve real problems. He is not trying to sound impressive. He is trying to be honest and clear.

Avoid:
- Corporate filler phrases ("passionate about", "leverage", "synergy")
- Emdashes in any form, anywhere, in any file in this repo
- Sounding like AI-generated content
- Overly formal or stiff sentence structure

## Architecture rules

- The header and footer are injected by `assets/js/main.js`. Never write them directly into HTML pages.
- All styles live in `style.css`. Do not add inline styles or `<style>` blocks unless explicitly asked.
- Do not add new CSS classes without asking first. The existing class set covers most needs.
- Pages inside `blog/` and `projects/` use `../style.css` and `../assets/js/main.js`. Root pages use `style.css` and `assets/js/main.js`.
- The Google Fonts import loads only Inter. Do not add other font families without asking.

## Key files

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `projects.html` | Projects listing |
| `blog.html` | Blog listing |
| `contact.html` | Contact page |
| `404.html` | Custom 404 |
| `style.css` | All styles |
| `assets/js/main.js` | Nav and footer injection |
| `sitemap.xml` | Search engine sitemap |
| `feed.xml` | RSS feed |
| `docs/SITE-GUIDE.md` | Full content management guide |

## When adding content

- New project: add detail page in `projects/`, add card to `projects.html`, update `sitemap.xml`
- New blog post: add page in `blog/`, add card to `blog.html`, add item to `feed.xml`, update `sitemap.xml`
- Always add newest content at the top of listing pages
- Always update `<lastmod>` dates in `sitemap.xml` when pages change

## What not to do

- Do not install npm packages or introduce a build step
- Do not add JavaScript frameworks or libraries
- Do not modify `CNAME`
- Do not add `_config.yml` (this would trigger Jekyll on GitHub Pages)
- Do not remove the `id="global-header"` or `id="global-footer"` attributes from any page
