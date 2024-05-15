import net from "net";

const html = `<h1>TCP</h1>`;

const responseHeaders = [
  "HTTP/1.1 200 OK",
  "Content-Type: text/html",
  "Content-Length: " + html.length,
  "\r\n",
  html,
];

const http = net.createServer((socket) => {
  socket.on("data", (data) => {
    if (/GET/.test(data.toString())) {
      socket.write(responseHeaders.join("\r\n"));
      socket.end();
    }
  });
});

http.listen(80, () => {
  console.log("listening on port 80");
});
