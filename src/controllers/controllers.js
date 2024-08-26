import fs from "node:fs";
import path from "node:path";
import { getAllProducts } from "../models/model.js";

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
};

export const serveProducts = (req, res) => {
    // A getAllProducts bemenő paramétere egy kétparaméteres callback függvény!!!
    getAllProducts((err, products) => {
        if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({error: err.message}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(products)); // Az adatok json-formátumban mennek el.
        }
    })
};

export const serveStaticFiles = (req, res) => {
    const mimeTypes = {
        ".html" : "text/html",
        ".js" : "application/javascript",
        ".css": "text/css",
        ".png": "image/png",
        "jpg": "image/jpg",
        "jpeg": "image/jpeg",
        ".ico": "image/x-icon"
    };

    const filePath = path.join(process.cwd(), "public", req.url);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("The static file not fount!");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", mimeTypes[ext]);
            // res.writeHead(200, {"Content-Type": `${mimeTypes[ext]}`});
            res.end(data);
        }
    })
};

export const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({message: "Not found"}));
}