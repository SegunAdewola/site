document.addEventListener("DOMContentLoaded", function() {
  // Inject font from a single place so all pages stay in sync
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard-std/dist/web/variable/pretendardStdVariable.css";
  document.head.appendChild(fontLink);

  const headerElement = document.getElementById("global-header");
  const footerElement = document.getElementById("global-footer");

  // Determine path level to maintain unbroken routes inside subdirectories
  const isSubdirectory = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/blog/');
  const prefix = isSubdirectory ? "../" : "";
  const currentPath = window.location.pathname;

  // Exact directory mapping logic ensuring the active class matches visible links
  const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');
  const isProjectsActive = currentPath.includes('projects');
  const isBlogActive = currentPath.includes('blog');
  const isContactActive = currentPath.includes('contact');
  const isResumeActive = currentPath.endsWith('Oluwasegun_Adewola_Resume.pdf');

  if (headerElement) {
    headerElement.innerHTML = `
      <div class="nav-container">
        <a href="${prefix}index.html" class="nav-logo">Oluwasegun<span> Adewola</span></a>
        <nav class="nav-links">
          <a href="${prefix}projects.html" class="${isProjectsActive ? 'active' : ''}">Projects</a>
          <!--<a href="${prefix}blog.html" class="${isBlogActive ? 'active' : ''}">Blog</a>-->
          <a href="${prefix}contact.html" class="${isContactActive ? 'active' : ''}">Contact</a>
          <a href="https://github.com/SegunAdewola" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/segunadewola/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${prefix}assets/documents/Oluwasegun_Adewola_Resume.pdf" class="${isResumeActive ? 'active' : ''}" target="_blank">Resume</a>
        </nav>
      </div>
    `;
  }

  if (footerElement) {
    footerElement.innerHTML = `
      <div class="footer-container">
        <p>&copy; ${new Date().getFullYear()} Oluwasegun Adewola.</p>
        <ul class="footer-links">
          <!--<li><a href="${prefix}feed.xml" target="_blank">RSS Feed</a></li>-->
          <li><a href="https://www.bible.com/bible/114/PHP.4.13.NKJV" target="_blank">I can do all things through Christ who strengthens me.</a></li>
        </ul>
      </div>
    `;
  }

  // --- Mermaid: load only on pages that have diagrams ---
  const mermaidDivs = document.querySelectorAll('.mermaid');
  if (mermaidDivs.length > 0) {
    const mermaidScript = document.createElement('script');
    mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    mermaidScript.onload = () => {
      // Save original diagram source before first render
      const sources = new Map();
      mermaidDivs.forEach(div => sources.set(div, div.textContent));

      const cssVar = (name) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim();

      const buildTheme = () => ({
        background: cssVar('--mermaid-bg'),
        mainBkg: cssVar('--mermaid-node-fill'),
        primaryColor: cssVar('--mermaid-node-fill'),
        primaryTextColor: cssVar('--mermaid-node-text'),
        primaryBorderColor: cssVar('--mermaid-border'),
        lineColor: cssVar('--mermaid-line'),
        secondaryColor: cssVar('--mermaid-cluster-bg'),
        tertiaryColor: cssVar('--mermaid-cluster-bg'),
        clusterBkg: cssVar('--mermaid-cluster-bg'),
        clusterBorder: cssVar('--mermaid-cluster-border'),
        edgeLabelBackground: 'transparent',
        titleColor: cssVar('--mermaid-title'),
        fontFamily: 'PretendardStd Variable, sans-serif',
        fontSize: '13px'
      });

      const render = () => {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          htmlLabels: false,
          themeVariables: buildTheme()
        });
        mermaid.run({ nodes: [...mermaidDivs] });
      };

      render();

      // Re-render when the OS color scheme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        mermaidDivs.forEach(div => {
          div.removeAttribute('data-processed');
          div.textContent = sources.get(div);
        });
        render();
      });
    };
    document.head.appendChild(mermaidScript);
  }

  // --- Prism: load only on pages that have code blocks ---
  const codeBlocks = document.querySelectorAll('code[class*="language-"]');
  if (codeBlocks.length > 0) {
    const languages = new Set();
    codeBlocks.forEach(el => {
      const match = el.className.match(/language-(\w+)/);
      if (match && match[1] !== 'none' && match[1] !== 'text') {
        languages.add(match[1]);
      }
    });

    const prismCSS = document.createElement('link');
    prismCSS.rel = 'stylesheet';
    prismCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(prismCSS);

    const loadScript = (src) => new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      document.head.appendChild(s);
    });

    const prismBase = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';
    loadScript(`${prismBase}/prism.min.js`).then(async () => {
      for (const lang of languages) {
        await loadScript(`${prismBase}/components/prism-${lang}.min.js`);
      }
      if (window.Prism) Prism.highlightAll();
    });
  }

});
