import fs from "node:fs";
import path from "node:path";

export const getAllProducts = (callback) => {
    const pathOfProducts = path.join(process.cwd(), "src", "products.json");

    fs.readFile(pathOfProducts, "utf-8", (err, data) => {
        if (err) {
            // Első paraméter a hibáé: ha hiba van, akkor null van az adatok helyén.
            callback(err, null); // Hiba esetén a callback hívódik meg, de a hibával.
        } else {
            const products = JSON.parse(data); // Adatok js-objektumként jelnnek meg.
            // Első paraméter a hibáé: ha nincs hiba (null), akkor visszaadjuk az adatokat.
            callback(null, products); 
        }
    })
}