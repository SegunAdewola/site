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
  const isProjectsActive = currentPath.includes('projects') || isHome;
  const isBlogActive = currentPath.includes('blog');
  const isContactActive = currentPath.includes('contact');

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
          <a href="${prefix}assets/documents/segun-adewola-resume.pdf" class="resume-link" target="_blank">Resume</a>
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
});
