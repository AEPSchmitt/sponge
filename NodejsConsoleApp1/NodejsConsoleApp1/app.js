"use strict";
const fs = require('fs');
const parseString = require('xml2js').parseString;

fs.readdir(__dirname, function(err, files){
    files.forEach(function (file){
        if (file.indexOf('.xml') != -1) {
            parseString(xml, function (err, result) {
                console.dir(result);
            });
        } else {
            console.log(file);
        }
    });
})