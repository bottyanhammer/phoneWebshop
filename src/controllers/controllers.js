import fs from "node:fs";
import path from "node:path";
import { getAllProducts } from "../models/model.js";
import { getProductById } from "../models/model.js";

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
        ".jpg": "image/jpg",
        ".jpeg": "image/jpeg",
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

export const serveProduct = (req, res, id) => {
    getProductById(id, (err, product) => {
        
        if (err) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: err.message}));
        };
        
        // Html code generation:
        const html = `
            <section class="mod-window">
                <div class="popup-content">
                    <h2>A termék adatainak módosítása</h2>
                    <ul>
                        <li><label for="make">Gyártó:</label> <input type="text" id="make" value="${product.make}"></li>
                        <li><label for="model">Model:</label> <input type="text" id="model" value="${product.model}"></li>
                        <li><label for="price">Ár:</label> <input type="number" id="price" value="${product.price}"></li>
                        <li><label for="stock">Készlet:</label> <input type="number" id="stock" value="${product.stock}"></li>
                    </ul>
                    <div class="pupup-buttons">
                        <button class="set" type="button">Módosítás</button>
                        <button class="exit" type="button">Mégse</button>
                    </div>
                </div>
            </section>
        `;
        
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    })
}

export const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({message: "Not found"}));
}