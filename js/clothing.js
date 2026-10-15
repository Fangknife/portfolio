const grid = document.getElementById("clothing-grid");

// Popup elements--------------------------------------------------
const popup = document.getElementById("clothing-popup");
const popupCarousel = document.getElementById("popup-carousel");
const popupInfo = document.getElementById("popup-info");
const popup_close_container = document.getElementById("popup_close_container");

// Current popup image--------------------------------------------------
let popupCurrentImage = 0;
let popupPiece = null;

// Load the manifest--------------------------------------------------
fetch("json/clothing.json")
    .then(response => response.json())
    .then(clothing => {
        // Create one carousel for every piece
        for (const piece of clothing) {
            const carousel = createCarousel(piece);
            grid.appendChild(carousel);
        }
    })
    .catch(error => {
        console.error(
            "Could not load clothing.json:",
            error
        );
    });

// Create a carousel--------------------------------------------------
function createCarousel(piece) {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    // Image container----------------------------------------------
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Image----------------------------------------------
    const image = document.createElement("img");
    image.src = `img/clothing/${piece.folder}/00.jpg`;
    image.alt = `Number ${piece.folder}`;
    imageContainer.appendChild(image);

    // Availability label----------------------------------------------
    const availabilityLabel = document.createElement("div");
    availabilityLabel.classList.add("availability-label");
    if (piece.sold) {
        var t = document.createElement("span");
        t.classList.add("availability-label-text");
        t.innerText = "Sold";
        availabilityLabel.appendChild(t);
    } else {
        var t = document.createElement("span");
        t.classList.add("availability-label-text");
        t.innerText = "Size " + piece.size;
        availabilityLabel.appendChild(t);
        t = t.cloneNode(true);
        t.innerText = "$" + piece.price;
        availabilityLabel.appendChild(t);
    }
    imageContainer.appendChild(availabilityLabel);


    // Make image clickable ----------------------------------------------
    image.style.cursor = "pointer";
    image.addEventListener("click", () => {
        openPopup(piece);
    });
    
    carousel.appendChild(imageContainer);
    // Arrow buttons----------------------------------------------
    var arrow_container = document.createElement("div");
    const arrow_left = document.createElement("div");
    arrow_left.classList.add("arrow_left");
    arrow_container.classList.add("arrow_container");
    arrow_container.style.left = "2px";
    arrow_container.appendChild(arrow_left);
    carousel.appendChild(arrow_container);
    
    arrow_container = document.createElement("div");
    const arrow_right = document.createElement("div");
    arrow_right.classList.add("arrow_right");
    arrow_container.classList.add("arrow_container");
    arrow_container.style.right = "2px";
    arrow_container.appendChild(arrow_right);
    carousel.appendChild(arrow_container);

    let currentImage = 0;
    // Previous----------------------------------------------
    arrow_left.addEventListener("click", () => {
        currentImage--;
        if (currentImage < 0) {
            currentImage = piece.imageCount - 1;
        }
        updateImage();
    });
    // Next----------------------------------------------
    arrow_right.addEventListener("click", () => {
        currentImage++;
        if (currentImage >= piece.imageCount) {
            currentImage = 0;
        }
        updateImage();
    });
    // Update image----------------------------------------------
    function updateImage() {
        const imageNumber =String(currentImage).padStart(2, "0");
        image.src = `img/clothing/${piece.folder}/${imageNumber}.jpg`;
    }
    return carousel;
}



// Open popup--------------------------------------------------
function openPopup(piece) {
    popupPiece = piece;
    popupCurrentImage = 0;

    // Clear previous popup contents----------------------------------------------
    popupCarousel.innerHTML = "";
    popupInfo.innerHTML = "";

    // Create popup image----------------------------------------------
    const image = document.createElement("img");
    image.src = `img/clothing/${piece.folder}/00.jpg`;
    image.alt = `Textile piece ${piece.folder}`;

    // buttons ----------------------------------------------
    popupCarousel.appendChild(image);

    const both_arrows = document.createElement("div");
    both_arrows.classList.add("both_arrows");
    popupInfo.appendChild(both_arrows);

    var arrow_container = document.createElement("div");
    const arrow_left = document.createElement("div");
    arrow_left.classList.add("arrow_left");
    arrow_container.classList.add("arrow_container");
    arrow_container.style.left = "-4px";
    arrow_container.appendChild(arrow_left);
    both_arrows.appendChild(arrow_container);
    
    arrow_container = document.createElement("div");
    const arrow_right = document.createElement("div");
    arrow_right.classList.add("arrow_right");
    arrow_container.classList.add("arrow_container");
    arrow_container.style.right = "-4px";
    arrow_container.appendChild(arrow_right);
    both_arrows.appendChild(arrow_container);


    // popup image arrows----------------------------------------------
    arrow_left.addEventListener("click", () => {
            popupCurrentImage--;
            if (popupCurrentImage < 0) {
                popupCurrentImage = piece.imageCount - 1;
            }
            updatePopupImage();
        }
    );
    arrow_right.addEventListener("click", () => {
            popupCurrentImage++;
            if (popupCurrentImage >= piece.imageCount) {
                popupCurrentImage = 0;
            }
            updatePopupImage();
        }
    );

    // Popup information----------------------------------------------
    if (piece.title !== "") {
        const title = document.createElement("div");
        title.style.fontWeight= "bold";
        title.style.paddingBottom = "14px";
        title.textContent = piece.title;
        popupInfo.appendChild(title);
    }
    // --
    const availability = document.createElement("div");
    if (piece.sold === true) {
        availability.textContent = "Sold";
    } else {
        availability.textContent = "For Sale";
    }
    popupInfo.appendChild(availability);
    // --
    if (piece.price !== "") {
        const price = document.createElement("div");
        price.textContent = "$" + Number(piece.price).toFixed(2);
        popupInfo.appendChild(price);
    }
    // --
    if (piece.size !== "") {
        const price = document.createElement("div");
        price.textContent = "Size " + piece.size;
        popupInfo.appendChild(price);
    }
        const info_description = document.createElement("div");
        info_description.style.fontSize = "14px";
        info_description.innerHTML = "<br> *Checkout functions are on pause while transitioning away from Etsy. Inquiry can be sent to ";
        let user = "vincwolfe";
        let domain = "gmail.com";
        info_description.innerHTML += '<a href="mailto:' + user + '@' + domain + '">' + user + '@' + domain + '</a>' + '.*' + '<br> <br>';
        info_description.innerHTML += "The base shirt has been thrifted and all patching, prints, embroidery, or photo transfer are my modifications. " +
            "The item may show signs of wear. Model is 5\'3\" and typically fits adult's small.";
        popupInfo.appendChild(info_description);
        
    // Show popup----------------------------------------------
    popup.style.display = "flex";


    var click_off = 1;
    document.getElementById("popup-content").addEventListener("mouseover", () => {
        click_off = 0;
    });
    document.getElementById("popup-content").addEventListener("mouseout", () => {
        click_off = 1;
    });
    popup.addEventListener("click", () => {
        if (click_off == 1) {
            popup.style.display = "none";
        }
    });
}

// Update popup image--------------------------------------------------
function updatePopupImage() {
    const imageNumber = String(popupCurrentImage).padStart(2, "0");
    const image = popupCarousel.querySelector("img");
    image.src = `img/clothing/${popupPiece.folder}/${imageNumber}.jpg`;
}

// Close popup--------------------------------------------------
const popup_close_x = document.createElement("div");
popup_close_x.classList.add("popup_close_x");
popup_close_container.classList.add("popup_close_container");
popup_close_container.appendChild(popup_close_x)

popup_close_container.addEventListener("click", () => {
    popup.style.display = "none";
});


