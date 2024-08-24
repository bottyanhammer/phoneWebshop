import http from "node:http";

const PORT = process.env.PORT || 3000;
const HOSTNAME = "127.0.0.1";

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    res.write("Ez egy gyakorló szöveg csupán.");
    res.end("Hello, World!");
});

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});