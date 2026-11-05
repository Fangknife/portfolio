
var player_container;

document.addEventListener("DOMContentLoaded", (event) => {
    player_container = document.getElementById("player_container");
    player_container.style.width = `min(100%, ${player_container_max_width}px,
                                    calc((100vh - 100px) * ${ratio_width} / ${ratio_height}))`;

    player_container.style.minWidth = player_container_min_width;
    player_container.style.aspectRatio = ratio_width/ratio_height;
    player_container.style.backgroundColor = 'black';
    if (document.getElementById("main_img")) {
        document.getElementById("main_img").style.aspectRatio = ratio_width/ratio_height;
    }
});
