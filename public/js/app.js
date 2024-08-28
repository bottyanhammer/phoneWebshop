const renderCards = (data) => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.innerHTML = "";
    // for (let product of data) {} // Konkatenálás helyett map().join("")
    const cardElements = data.map(({ id, make, model, picture, description, price, stock }) =>
        `<div class="card" data-id="${id}">
                <img src="./images/${picture}" alt="" title="">
                <div class="card-body">
                    <h3>${make}</h3>
                    <h4>${model}</h4>
                    <p>${description}</p>
                    <div>
                        <h5>${price} Ft</h5>
                        <h5>${stock} db</h5>
                    </div>
                    <div class="buttons">
                        <button class="edit-btn" type="button">Szerkeszt</button>
                        <button class="delet-btn" type="button">Töröl</button>
                    </div>
                </div>
            </div>`).join(""); // A tömböt elválasztók nélkül egy sztringgé fűzzük össze.
    wrapper.innerHTML = cardElements;  // cardElements egy lista, vesszőkkel határolva az elemei!!!
};

const exitButtonManager = () => {
    const exitButton = document.querySelector(".exit");
    exitButton.addEventListener("click", (event) => {
        const button = event.target;
        const popupContainer = button.closest(".popup");
        popupContainer.classList.add("hidden");

    });
};

// Modification current product:
const getInputValues = () => {
    const makeInputValue = document.querySelector("#make").value;
    const modelInputValue = document.querySelector("#model").value;
    const priceInputValue = parseInt(document.querySelector("#price").value);
    const stockInputValue = parseInt(document.querySelector("#stock").value);
    return [makeInputValue, modelInputValue, priceInputValue, stockInputValue];
};

const setButtonManager = () => {
    const setButton = document.querySelector(".set");
    let productId = "";
    setButton.addEventListener("click", async (event) => {
        popupContent = event.target.closest(".popup-content");
        // A data-currentId kisbetűs lesz!!!!
        const productId = popupContent.dataset.currentid;
        console.log(Number(productId)); // teszt - string!!!

        [make, model, price, stock] = getInputValues();
        const newValues = {
            make,
            model,
            price,
            stock
        };

        try {
            const response = await fetch(`/modifyProduct/${productId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newValues)
            });

            if (!response.ok) {
                throw new Error(response.status);
            };

            const responseData = response.json();
            if (responseData.message = ok) {
                getAllProducts();
            }

        } catch (error) {
            console.error(`The product modification failed: ${error}`);
        }
    });
};

async function getPopupWindow(event) {
    const card = event.target.closest(".card");
    console.log(card.dataset.id);  // teszt 

    const productId = card.dataset.id;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
        // Egy erőforrásért megy kérés, queryParam helyett path javasolt:
        const product = await fetch(`/getProduct/${productId}`, {
            method: "GET",
            headers: myHeaders
        });
        if (!product.ok) {
            throw new Error(`An error has occured: ${product.status}`);
        }

        const htmlFragment = await product.text(); // Csak ígéretem van, hogy megkapom!!!
        const popupContainer = document.querySelector(".popup");
        popupContainer.innerHTML = htmlFragment;
        popupContainer.classList.remove("hidden");

        // Popup Window elemeit itt érem el:***************************************
        // Exit popup window:        
        exitButtonManager();

        setButtonManager();

    } catch (error) {
        console.error(`An error has occured: ${error}`);
    }
};

function cardDeletion(event) {
    const card = event.target.closest(".card");
    const productId = card.dataset.id;
};

async function getAllProducts() {
    try {
        const response = await fetch("/getProducts", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`An error has occured: ${response.status}`);
        };

        const products = await response.json();
        // console.log(products); // Teszt
        // Kártyák renderelése:
        renderCards(products);
        const setButtons = document.querySelectorAll(".buttons button:nth-child(1)");
        const delButtons = document.querySelectorAll(".buttons button:last-child");
        // console.log(delButtons);
        setButtons.forEach(button => {
            button.addEventListener("click", getPopupWindow);
        });
        for (let button of delButtons) {
            button.addEventListener("click", cardDeletion);
        };

    } catch (error) {
        console.error(`An error has occured: ${error}`);
    }

};

document.addEventListener("DOMContentLoaded", getAllProducts);
// A renderelt elemeket itt még nem érem el az aszinkron (AJAX) kérés miatt. A kérés később teljesül, mint az itt található kód lefut...

