import fs from "node:fs";
import path from "node:path";

export const serveIndex = (req, res) => {
    const indexPath = path.join(process.cwd(), "public", "index.html");
    fs.readFile(indexPath, "utf-8", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        if (err) {
            const message = "Error loading index.html";
            res.statusCode = 500;
            res.end(message);
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    })
}