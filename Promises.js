/**
 * Created by Grant on 1/25/2016.
 */
// uncomment the code below to see a test pass
const fs = require('fs');
const Promise = require('bluebird');
var Path = require('path');

exports.getPathType = function(Path){
    if (typeof Path != "string"){
        return Promise.reject();
    }

    return new Promise(function(resolve, reject){
        var returnVal;

        if(typeof Path != "string"){
            reject("Path was not a string");
            return;
        }

        fs.stat(Path, function(err, stats){
            if(err){
                console.log("nothing");
                returnVal = "nothing";
            }
            else if(stats.isFile())
            {
                console.log("it's a file");
                returnVal = "file";
            }
            else if(stats.isDirectory()){
                returnVal = "directory";
            }

            else{
                console.log("Something Else")
            }
            resolve(returnVal);
        });
    })
}


//get directory type is below


exports.readdir = function(path) {
    return exports.getPathType(path)
        .then(function(type) {
            if (type !== 'directory') throw Error('Not a directory');
            return new Promise(function(resolve, reject) {
                fs.readdir(path, function(err, files) {
                    if (err) return reject(err);
                    return resolve(files);
                });
            });
        });
};

exports.getDirectoryTypes = function(path, depth, filter) {
    var result = {};

    if (arguments.length < 2) depth = -1;
    if (arguments.length < 3) filter = function() { return true };

    if(typeof depth != "number"){
        return Promise.reject();
    }

    return exports.readdir(path)
        .then(function(files) {
            var promises = [];
            files.forEach(function(file) {
                var fullPath = Path.resolve(path, file);
                var promise = exports.getPathType(fullPath)
                    .then(function(type) {
                        if (filter(path, type)) result[fullPath] = type;
                        if (type === 'directory' && depth !== 0) {
                            return exports.getDirectoryTypes(fullPath, depth - 1, filter)
                                .then(function(map) {
                                    Object.assign(result, map);
                                });
                        }
                        else {
                            console.log("Type is: " + type + " jjj");
                        }
                    });
                promises.push(promise);
            });
            return Promise.all(promises)
                .then(function() {
                    return result;
                });
        });
}


//****************exists function
exports.exists = function(Path){
    var result;
    if (typeof Path != "string"){
        return Promise.reject();
    }

    return new Promise(function(resolve, reject){
        exports.getPathType(Path).then(function(currentPath){
            if(currentPath != "nothing"){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });

}
