// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
// https://frontend-hero.com/how-to-create-hamburger-menu
const portfolioRoot = window.location.hostname === "fangknife.com"
    ? "/portfolio/"
    : "/";


//     <!-- HTML -->
// <header class="header">
//   <div class="header-content">
//     <span class="logo">Logo</span>
//     <button class="hamburger" onclick="this.closest('.header').classList.toggle('menu-open')">
//       <span class="line"></span>
//       <span class="line"></span>
//       <span class="line"></span>
//     </button>
//   </div>
//   <nav class="dropdown-menu">
//     <ul class="menu">
//       <li><a href="#">Home</a></li>
//       <li><a href="#">About</a></li>
//       <li><a href="#">Services</a></li>
//       <li><a href="#">Contact</a></li>
//     </ul>
//   </nav>
// </header>

// /* CSS */
// .header {
//   background: white;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// }

// .header-content {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
// }

// .logo {
//   font-weight: bold;
//   font-size: 1.25rem;
// }

// .hamburger {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 40px;
//   height: 40px;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   gap: 5px;
// }

// .line {
//   display: block;
//   width: 24px;
//   height: 3px;
//   background: #333;
//   border-radius: 2px;
//   transition: all 0.3s ease;
// }

// .dropdown-menu {
//   max-height: 0;
//   overflow: hidden;
//   transition: max-height 0.3s ease;
//   background: #f9fafb;
//   border-top: 1px solid #e5e7eb;
// }

// .menu {
//   list-style: none;
//   padding: 0;
//   margin: 0;
// }

// .menu a {
//   display: block;
//   padding: 1rem;
//   color: #333;
//   text-decoration: none;
//   border-bottom: 1px solid #e5e7eb;
//   transition: background 0.2s ease;
// }

// .menu a:hover {
//   background: #e5e7eb;
// }

// /* Active states */
// .header.menu-open .dropdown-menu {
//   max-height: 300px;
// }

// .header.menu-open .hamburger .line:nth-child(1) {
//   transform: translateY(8px) rotate(45deg);
// }

// .header.menu-open .hamburger .line:nth-child(2) {
//   opacity: 0;
// }

// .header.menu-open .hamburger .line:nth-child(3) {
//   transform: translateY(-8px) rotate(-45deg);
// }
const mobileTemplate = document.createElement('template');
mobileTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            width:100%;
            height: 60px;
            position: sticky;
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
        </style>

        <button class="hamburger" onclick="this.classList.toggle('active')">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </button>
        
`;
const image = document.createElement("img");
image.src = `${portfolioRoot}img/banner2.png`;
image.classList.add("mobile_img");
mobileTemplate.content.appendChild(image);




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

