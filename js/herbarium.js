const grid = document.getElementById("image_grid");

// Popup elements--------------------------------------------------
const popup = document.getElementById("image_popup");
const popup_carousel = document.getElementById("popup_carousel");
const popup_info = document.getElementById("popup_info");
const popup_close_container = document.getElementById("popup_close_container");

// Load the manifest--------------------------------------------------
fetch("../json/herbarium.json")
    .then(response => response.json())
    .then(artworks => {
        // Create one carousel for every piece
        for (const piece of artworks) {
            const carousel = createCarousel(piece);
            grid.appendChild(carousel);
        }
    })
    .catch(error => {
        console.error(
            "Could not load the file list .json:",
            error
        );
    });

// Create a carousel--------------------------------------------------
function createCarousel(piece) {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    // Image container------------------------------------
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image_container");

    // Image----------------------------------------------
    const image = document.createElement("img");
    image.src = `../img/herbarium/${piece.image}`;
    image.alt = `${piece}`;
    imageContainer.appendChild(image);

    // Make image clickable ----------------------------------------------
    image.style.cursor = "pointer";
    image.addEventListener("click", () => {
        openPopup(piece);
    });
    carousel.appendChild(imageContainer);
    return carousel;
}


// Open popup--------------------------------------------------
function openPopup(piece) {

    // Clear previous popup contents----------------------------------------------
    popup_carousel.innerHTML = "";
    popup_info.innerHTML = "";

    // Create popup image----------------------------------------------
    const image = document.createElement("img");
    image.src = `../img/herbarium/${piece.image}`;
    image.alt = `${piece}`;
    popup_carousel.appendChild(image);

    // Popup information----------------------------------------------
    const second_image = document.createElement("img");
    second_image.src = `../img/herbarium/${piece.tag}`;
    second_image.alt = `${piece.tag}`;
    second_image.classList.add("popup_second_image");
    popup_info.appendChild(second_image);
    
    popup.style.display = "flex";

    // Click off to exit ----------------------------------------------
    var click_off = 1;
    document.getElementById("popup_content").addEventListener("mouseover", () => {
        click_off = 0;
    });
    document.getElementById("popup_content").addEventListener("mouseout", () => {
        click_off = 1;
    });
    popup.addEventListener("click", () => {
        if (click_off == 1) {
            popup.style.display = "none";
        }
    });
}


// Close popup "X" --------------------------------------------------
const popup_close_x = document.createElement("div");
popup_close_x.classList.add("popup_close_x");
popup_close_container.classList.add("popup_close_container");
popup_close_container.appendChild(popup_close_x)

popup_close_container.addEventListener("click", () => {
    popup.style.display = "none";
});


