import http from "node:http";
import { loggingManager } from "./src/middlewares/middleLog.js";
import { router } from "./src/routes/routes.js";

const PORT = process.env.PORT || 3000;
const HOSTNAME = "127.0.0.1";

const server = http.createServer((req, res) => {
    loggingManager(req, res, () => {
        router(req, res);
    })
    // res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    // res.write("Ez egy gyakorló szöveg csupán.");
    // res.end("Hello, World!");
});

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});