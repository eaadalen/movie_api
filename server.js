const http = require('http');
const fs = require("fs");

http.createServer((request, response) => {
    console.log(request.url);

    /*let url = new URL(request.url, `http://${request.headers.host}`);
    console.log(url);
    let filePath = "";

    if (url.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
      console.log(filePath);
    } 

    fs.appendFile(
      "log.txt",
      `URL: ${request.url} \nTimestamp: ${new Date()} \n \n`,
      (err) => {
        if (err) {
          console.log("append error");
        } 
        else {
          console.log("msg appended");
        }
      }
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end("hello node");
    });*/
  }).listen(8080);