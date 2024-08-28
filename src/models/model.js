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
};

export const getProductById = (id, callback) => {
    const pathOfProducts = path.join(process.cwd(), "src", "products.json");

    fs.readFile(pathOfProducts, "utf-8", (err, data) => {
        if (err) {
            return callback(err, null); // Return, hogy a fájlolvasás leálljon. Két paraméter: hiba, adat.
        };

        const products = JSON.parse(data);
        const product = products.find(p=> Number(p.id) === parseInt(id));
        

        if (!product) {
            return callback(new Error("The product not found"), null); // Return, hogy a függvény is leálljon!
        };

        console.log("Find eredménye:", product);  // teszt
        callback(null, product); // Itt már nem kell a leállítás (return), csak az adatok átadása a hívónak.
    });
}; 

export const updatedProductById = (id, newData, callback) => {
    const pathOfProducts = path.join(process.cwd(), "src", "products.json");
    fs.readFile(pathOfProducts, "utf-8", (err, data) => {
        if (err) {
            return callback(err, null);
        };

        let products = JSON.parse(data); // A termékek listája.
        
        let productIndex = products.findIndex(p=> Number(p.id) === Number(id));

        if (productIndex === -1) {
            return callback(new Error("Termék nem található."), null);
        };

        // Módosítás:
        products[productIndex] = {...products[productIndex], ...newData};

        console.log(products);  // teszt 

        // Fájl felülírása:
        fs.writeFile(pathOfProducts, JSON.stringify(products, null, 2), (err)=>{
            if (err) {
                return callback(err, null);
            };
            callback(null, products[productIndex]);
        });
    
    });
}