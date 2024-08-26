import path from "node:path";
import { serveIndex } from "../controllers/controllers.js";
import { serveProducts } from "../controllers/controllers.js";
import { serveStaticFiles } from "../controllers/controllers.js";
import { notFoundHandler } from "../controllers/controllers.js";

export const router = (req, res) => {
    const parsedURL = new URL(req.url, `http://${req.headers.host}`); // Egy objektumot kapunk!
    const pathName = parsedURL.pathname;
    const queryParams = parsedURL.searchParams.get("id");

    if ((pathName === "/" || pathName === "./index.html") && req.method === "GET") {
        serveIndex(req, res);
    } else if (pathName === "/getProducts" && req.method === "GET") {
        serveProducts(req, res);
    } else if (req.method === "GET") {

    } else if (req.method === "GET") {
        serveStaticFiles(req, res);
    } else {
        notFoundHandler(req, res);
    }
}