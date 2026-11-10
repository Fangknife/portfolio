const fs = require("fs");
const path = require("path");

const imageFolder = "img/herbarium";
const outputFile = "json/herbarium.json";


const images = fs.readdirSync(imageFolder)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, JSON.stringify(images, null, 2));

console.log("json created!");