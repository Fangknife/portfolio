// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
// https://frontend-hero.com/how-to-create-hamburger-menu

const mobileTemplate = document.createElement('template');
mobileTemplate.innerHTML = `
    <style>
        :host {
            z-index: 10;
            position: fixed;
            display: block;
            width: 100%;
            height: 60px;
            top: 0;
            align-self: flex-start;
            font-size: 18px;
            background-color: black;
        }
        .mobile_img {
            position: relative;
            height: 80%;
            left: 0px;
            top: 10%;
        }
        .hamburger {
            position: absolute;
            top: 10px;
            right : 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            cursor: pointer;
            gap: 8px;
        }
        .line {
            display: block;
            width: 33px;
            height: 4px;
            background: white;
            border-radius: 2px;
            transition: all 0.2s ease;
            transform-origin: center;
        }
        .hamburger.active .line:nth-child(1) {
            transform: translateY(12px) rotate(45deg) scaleX(1.25);
        }
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }
        .hamburger.active .line:nth-child(3) {
            transform: translateY(-12px) rotate(-45deg) scaleX(1.25);
        }
        .header {
            z-index: 10;
            position: absolute;
            top: 60px;
            width: 100%;
            left: 0px;
        }
        .dropdown-menu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            background: black;
        }
        .menu {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
            font-weight: bold;
        }
        .menu a {
            display: block;
            padding: 1rem;
            color: var(--text_color);
            text-decoration: none;
            border-bottom: 1px solid var(--text_color);
            transition: background 0.2s ease;
        }
        .menu a:hover {
          color: var(--dark_text_color);
        }
        .header.menu-open .dropdown-menu {
          max-height: 300px;
        }

        </style>
        <a href="fangknife.com">
            <img src="${portfolioRoot}img/banner2.png" class="mobile_img"/>
        </a>

        <button class="hamburger" onclick="this.nextElementSibling.classList.toggle('menu-open')
            this.classList.toggle('active')">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </button>
        <header class="header">
            <nav class="dropdown-menu">
                <ul class="menu">
                <li> <a href="#">About</a></li>
                <li> <a href="${portfolioRoot}index.html">The Eternal Now</a></li>
                <li> <a href="${portfolioRoot}internal_world.html">The Internal World</a></li>
                <li> <a href="${portfolioRoot}clothing.html">Textile / For Sale</a></li>
                <li> <a href="${portfolioRoot}books.html">Books</a></li>
                </ul>
            </nav>
        </header>
`;

class Mobile extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(mobileTemplate.content);
  }
}
customElements.define('mobile-component', Mobile);

