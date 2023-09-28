const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((request, response) => {

  let url = new URL(request.url, `http://${request.headers.host}`);
  console.log(url);
  let filePath = "";

  if (url.pathname.includes("documentation")) {
    filePath = __dirname + "/documentation.html";
  } 

  fs.appendFile("log.txt",`URL: ${request.url} \nTimestamp: ${new Date()} \n \n`, (err) => {
      if (err) {
        console.log("append error");
      } 
      else {
        console.log("msg appended");
      }
    }
  );

}).listen(8080);

console.log("Listening on port 8080...");