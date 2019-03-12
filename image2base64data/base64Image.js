const fs = require('fs');  
const path = require('path');  
const mineType = require('mime-types');  
let origin = "./base64_images/";
let target = "./base64_json/";
let index = 0;

fs.readdir(origin, (err, files) => {
    files.forEach(file => {
        index++;
        console.log(">> " + file);
        var file_name = file.split(".")[0];
        let filePath = path.resolve(origin + file);  
        let data = fs.readFileSync(filePath);  
        var base64Img = data.toString('base64');
        base64Img = "data:image/jpg;base64," + base64Img;
        fs.writeFileSync(target + file_name + ".json", JSON.stringify({"imageData": base64Img}));
    });

    console.log("count: " + index, "\nDone!");
});
