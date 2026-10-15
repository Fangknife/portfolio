let current_img = 0;
var page_num;
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
            load_page();
        })
});

function load_page() {
    navbar();

    page_num = document.getElementById("page_num");
    page_num.addEventListener("keypress", isNumberKey);
    page_num.addEventListener("input", () => {
        if(page_num.checkValidity() == true) {  // catching valueMissing: true
            input = parseInt(page_num.value);
            page_num.classList.remove("invalid")
            if (input > 0 && input <= image_list.length) {
                current_img = input - 1;
                showImage();
            }
        }
    });
    showImage()
    page_num.value = current_img + 1;
    page_num.max = image_list.length;
    document.getElementById("page_num_max").value = image_list.length;
}

function showImage() {
    document.getElementById("main_img").src = image_folder + image_list[current_img];
}

function isNumberKey(evt) { // don't allow letters to be typed in field
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        evt.preventDefault();
        return false;
    return true;
}

function right_arrow() {
    current_img = (current_img + 1) % image_list.length;
    showImage();
    page_num.value = current_img + 1;
}

function left_arrow() {
    current_img = (current_img - 1 + image_list.length) % image_list.length;
    showImage();
    page_num.value = current_img + 1;
};

// navbar constructor----------------------------
function navbar() {
    navbar = document.getElementById("navbar");
    navbar.innerHTML = `
        <div class="arrow_container">
            <a href="#" class="arrow_left" id="arrow_left"
                onclick="left_arrow()"></a>
        </div>
        <div class="navtext">
            Page 
            <input type="text" class="page_num" id="page_num"
                inputmode="numeric" minlength="1" maxlength="2" 
                pattern="[0-9]{1,2}" autocomplete="off" required/>
            of
            <input type="text" class="page_num" id="page_num_max" readonly="true">
        </div>
        <div class="arrow_container">
            <a href="#" class="arrow_right" id="arrow_right"
                onclick="right_arrow()"></a>
        </div>
    `;
}





