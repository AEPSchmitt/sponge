"use strict";
const fs = require('fs');
const parseString = require('xml2js').parseString;
const path = require('path');
const rootpath = '\\\\ks-kgb-dist-tmf\\h$\\spatialsuite\\sites\\test-kkkort.kk.dk\\appbase\\spatialmap\\WEB-INF\\config';

function getTools(){
    var tool_folders = [
        'tools/custom/',
        'tools/standard/'
    ];
    var tools = [];

    tool_folders.forEach(function(folder){
        var files = fs.readdirSync(path.join(rootpath, folder));
        files.forEach(function(file){
            if (file.indexOf('.xml') != -1) {
                var filename = folder + file;
                tools.push(filename);
            }
        });
    });
    return tools;
}

function getThemes(){
    var subfolders = getDirectories(path.join(rootpath, 'themes/intern/temaer'));
    var themes = readEntireDirectory('themes').filter(function(p){
        return (p.indexOf('.xml') != -1)
    });
    return themes;
}

function readXML(file){
    var xml = fs.readFileSync(path.join(rootpath, file), 'utf8');
    parseString(xml, function(err, result){
        console.log(JSON.stringify(result, null, 3));
    });
}

function readEntireDirectory(dir) {
    var results = [];
    var list = fs.readdirSync(path.join(rootpath,dir));
    list.forEach(function(file) {
        file = path.join(dir, file);
        var stat = fs.statSync(path.join(rootpath, file));
        if (stat && stat.isDirectory()){
            results = results.concat(readEntireDirectory(file))
        } else {
            results.push(file)
        }   
    })
    return results
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function getContentOfType(srcpath, filetype){
    return fs.readdirSync(srcpath).filter(function(file) {
        return (file.indexOf('.' + filetype) != -1);
    });
}

readXML('themes\\intern\\temaer\\brugbyen\\theme-kff-arkiver.xml');