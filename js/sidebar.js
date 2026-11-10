// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const portfolioRoot = window.location.hostname === "fangknife.com"
    ? "/portfolio/"
    : "/";

const sidebarTemplate = document.createElement('template');
sidebarTemplate.innerHTML = `
    <style>
        :host {
            flex-shrink: 0;
            width:200px;
            position: sticky;
            top: 0;
            align-self: flex-start;
            font-size: 18px;
        }
        h1 {
            font-size: var(--heading_text_size);
            text-align: center;
            margin-top: 15px;
        }
        .sidebar_img {
            display: block;
            position: relative;
            width: 75%;
            left: 12.5%;
            margin-top: 15px;
            margin-bottom: 20px;
        }
        .sidebar_links {
            padding-left: 10px;
            line-height: 140%;
        }
        a, a:visited {
            text-decoration: none;
            color: var(--text_color);
        }
        a:focus, a:hover  {
            color: white;
            text-decoration: none;
            background-color: var(--hover_color);
        }
        a:active {
            background: var(--focus_color);
        }
    </style>
   
    <h1>Vincent Wolfe</h1>
    <img src="${portfolioRoot}img/portrait.jpg" class="sidebar_img"/>
    <div class="sidebar_links">
        <span style="font-weight: bold; text-transform: uppercase;">Portfolios </span> <br>
        <a href="${portfolioRoot}index.html">The Eternal Now</a> <br>
        <a href="${portfolioRoot}internal_world.html">The Internal World</a> <br>
        <a href="${portfolioRoot}clothing.html">Textile / For Sale</a> <br>
        <a href="${portfolioRoot}books.html">Books</a> <br> <br>

        <span style="font-weight: bold; text-transform: uppercase;">
            <a href="https://fangknife.com/">Fangknife.com</a>
        </span>
    </div>
`;

class Sidebar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(sidebarTemplate.content);
  }
}
customElements.define('sidebar-component', Sidebar);

        // <span style="font-weight: bold; text-transform: uppercase;">
        //     <a href="${portfolioRoot}index.html">About</a>
        // </span>