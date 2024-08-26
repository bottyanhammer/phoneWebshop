const renderCards = (data) => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.innerHTML = "";
    // for (let product of data) {} // Konkatenálás helyett map().join("")
    const cardElements = data.map(({ id, make, model, picture, description, price, stock }) => 
        `<div class="card data-id="${id}">
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

const cardModification = (event) => {
    const card = event.target.closest(".card");
    const productId = card.dataset.id;
};

function cardDeletion(event) {
    const card = event.target.closest(".card");
    const productId = card.dataset.id;
};

const getAllProducts = async() => {
    try{
        const response = await fetch("/getProducts", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
    
        if (!response.ok) {
            throw new Error(`An error has occured: ${response.status}`);

        } else {
            const products = await response.json();
            // console.log(products); // Teszt
            // Kártyák renderelése:
            renderCards(products);
            const setButtons = document.querySelectorAll(".buttons button:nth-child(1)");
            const delButtons = document.querySelectorAll(".buttons button:last-child");
            // console.log(delButtons);
            setButtons.forEach(button => {
                button.addEventListener("click", cardModification);
            });
            for (let button of delButtons) {
                button.addEventListener("click", cardDeletion)
            }
        }
    }catch(error){
        console.error(`An error has occured: ${error}`);
    }

};

document.addEventListener("DOMContentLoaded", getAllProducts);
 // A renderelt elemeket itt még nem érem el az aszinkron (AJAX) kérés miatt. A kérés később teljesül, mint az itt található kód lefut...
