var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello World!</h1>");
  response.end();
}

http.createServer(onRequest).listen(80);
