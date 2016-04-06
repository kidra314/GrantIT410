var port     = process.env.PORT || 8080; //defines the port the server is listening on
var http = require("http"); //defines as an HTTP request
var fs = require('fs');
var url = require('url');

myServer = http.createServer( function (request, response) {
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   if(pathname == "/"){
     console.log("going to index");
     pathname = "/index.html";
   }
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");

   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{
         //Page found
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});

         // Write the content of the file to response body
         response.write(data.toString());
      }
      // Send the response body
      response.end();
   });
});


myServer.listen(port, function(){
  console.log("Currently listenign to port ", port );
})
