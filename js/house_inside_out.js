
var page_num_display;
var image_list = [];

function load_json(path) {
  return fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok :(');
      }
      return response.json();
    })
    .catch(err => console.log('Error', err))
}

document.addEventListener("DOMContentLoaded", (event) => {
    load_json(json_file).then(images => {
    for (const image of images) {
            image_list.push(image);
        };
        console.log("json loaded");
        load_page();
    })
});

// load all the page files into new divs -------------------
function load_page() {
    for (let i = 0; i < image_list.length; ++i) {
        const page_file = image_list[i];
        create_page(i);
    }
    function create_page(i) {
        const flipbook = document.getElementById("flipbook");
        const flipbook_page = document.createElement("div");
        if (i == 0) {
            flipbook_page.classList.add("c-flipbook__page");
            flipbook_page.classList.add("first-page");
            flipbook_page.classList.add("is-active");    
        } if (i == image_list.length-1) {
            flipbook_page.classList.add("c-flipbook__page");
            flipbook_page.classList.add("last-page");
        } else {
            flipbook_page.classList.add("c-flipbook__page");
        }
        const flipbook_img = document.createElement("img");
        flipbook_img.classList.add("c-flipbook-image");
        flipbook_img.src = `/img/house_inside_out/${image_list[i]}`;

        flipbook_page.appendChild(flipbook_img);
        flipbook.appendChild(flipbook_page);
    };
    document.getElementById("flipbook-wrapper").style.position = "relative";
    document.getElementById("player_container").style.overflowX = "clip";
    document.getElementById("player_container").style.overflowY = "visible";
    // document.getElementById("player_container").style.padding = "15px 0px"
    console.log("done adding page divs");
    navbar();
    load_flipbook()
}
// execute on page turn (correct page visibility) ---------------
function load_flipbook() {
    console.log("making flipbook");
    window.flipBook = new FlipBook('flipbook', {
        nextButton: document.getElementById('arrow_right'), // next button element
        previousButton: document.getElementById('arrow_left'), // previous button element
        canClose: true, // book can close on its cover
        initialActivePage: 0, // index of initial page that is opened

        onPageTurn: (_, els) => {
            var active_pages = [];
            for (let i = 0; i < els.children.length; ++i) {
                if (els.children[i].classList.contains("is-active")) {  // if it's active
                        active_pages.push(i);
                }
            }
            // vvv make correct pages visible ---------------------------
            if (active_pages.length !== 1) { // inner spread, not cover ---------------------------
                for (let i = 0; i < els.children.length; ++i) {
                    if (i >= active_pages[0]-2 && i <= active_pages[1]+2) {
                        els.children[i].style.visibility = "visible";
                    } else {
                        els.children[i].style.visibility = "hidden";
                    }
                } // vvv for the page between two window cut out pages ---------------------------
                if (active_pages[1] !== 2 && active_pages[1] !== els.children.length-2) {    // if not next to either cover
                    if (active_pages[1] % 4 == 0 && els.children[active_pages[1]].classList.contains("is-animating")){
                        els.children[active_pages[0]-3].style.visibility = "visible";
                        els.children[active_pages[1]+4].style.visibility = "visible";
                    }
                    if (active_pages[1] % 4 == 2 && els.children[active_pages[1]-1].classList.contains("is-animating")){
                        els.children[active_pages[0]-4].style.visibility = "visible";
                        els.children[active_pages[1]+3].style.visibility = "visible";
                    }
                }
            }
            
            if (active_pages[0] == 0) {
                document.getElementById("arrow_left").style.pointerEvents = "none";
                document.getElementById("arrow_left").style.backgroundColor = "#ffffff10";
            }
            if (active_pages[0] == els.children.length-1) {
                
                document.getElementById("arrow_right").style.pointerEvents = "none";
                document.getElementById("arrow_right").style.backgroundColor = "#ffffff10";
            }
            if (active_pages[1] == 2) {
                document.getElementById("arrow_left").style.pointerEvents = "all";
                document.getElementById("arrow_left").style.backgroundColor = "var(--text_color)";
            }
            if (active_pages[1] == els.children.length-2) {
                document.getElementById("arrow_right").style.pointerEvents = "all";
                document.getElementById("arrow_right").style.backgroundColor = "var(--text_color)";
            }
            document.getElementById("page_num").value = active_pages[0]+1;
        },
    });
}
// ---------------------------------------------------------
// navbar constructor----------------------------
function navbar() {
    navbar = document.getElementById("navbar");
    navbar.innerHTML = `
        <div class="arrow_container">
            <a href="#" class="arrow_left" id="arrow_left"></a>
        </div>
        <div class="navtext">
            Page 
            <input type="text" class="page_num" id="page_num" readonly="true"/>
            of
            <input type="text" class="page_num" id="page_num_max" readonly="true">
        </div>
        <div class="arrow_container">
            <a href="#" class="arrow_right" id="arrow_right"></a>
        </div>
    `;
    page_num_display = document.getElementById("page_num");
    page_num_display.value = 1;
    page_num_display.max = image_list.length;
    document.getElementById("page_num_max").value = image_list.length;
    document.getElementById("arrow_left").classList.add("arrow_off");
    document.getElementById("arrow_left").style.backgroundColor = "#ffffff10";
    console.log("done adding navbar");
}
