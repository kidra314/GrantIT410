/**
 * Created by Grant on 1/25/2016.
 */
const fs = require('fs')
//this function receives a path name and says whether it points to a file, directory, or other

/*exports.*/ getPathType = function(Path){
    return new Promise(function(resolve, reject){

        var returnVal;

        if(typeof Path != "string"){
            throw new Error("Path was not a string");
        }

        fs.stat(Path, function(err, stats){
            if(err){
                //console.log("nothing");
                returnVal = "nothing";
            }
            else if(stats.isFile())
            {
                //console.log("it's a file");
                returnVal = "file";
            }
            else if(stats.isDirectory()){
                returnVal = "directory";
                //console.log("directory");
            }

            else{
                //console.log("Something Else");
                returnVal = "Something Else";
            }
            resolve(returnVal);
        });
    })
}




exists = function(myPath) {
  return new Promise(function(Path){
    var returnVal;
      getPathType(myPath).then(function(currentPath){
          console.log("currentPath is currently a: " + currentPath);
          returnVal = currentPath;
        });
});
}

//var fileName = "F:/IT410/PracticeProjects/sized-files/small.txt";
var fileName = 123;
exists(fileName);