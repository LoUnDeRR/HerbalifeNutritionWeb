function productsConstruction() {
    // (C1) GET HTML ELEMENTS
    let cartProducts = document.getElementById("cart_products");

    // (C2) CREATE PRODUCTS
    // // cartProducts.innerHTML = "";
    
    for (let id in products) {
        // ITEM
        let product = products[id];
        let item = document.createElement("div");
        item.className = "p_item";
        cartProducts.appendChild(item);

        // PRODUCT IMAGE AND CLICK HANDLER CONTAINER
        let pImgClickHandlerContainer = document.createElement("div");
        pImgClickHandlerContainer.className = "p_imgClickHandlerContainer";
        item.appendChild(pImgClickHandlerContainer);

        // PRODUCT CLICK HANDLER
        let pClickHandler = document.createElement("a");
        pClickHandler.addEventListener('click', function () {
            cart.activeId = id;
            OpenProductOverlay();
        });
        pClickHandler.className = "p_clickHandler";
        pImgClickHandlerContainer.appendChild(pClickHandler);

        // PRODUCT IMAGE BACK
        let pImgBack = document.createElement("img");
        if (product.images[1] != null) {
            pImgBack.src = "images/" + product.images[1];
        } else {
            pImgBack.src = "images/" + product.images[0];
        }
        pImgBack.className = "p_imgBack";
        pImgClickHandlerContainer.appendChild(pImgBack);

        // PRODUCT IMAGE FRONT
        let pImgFront = document.createElement("img");
        pImgFront.src = "images/" + product.images[0];
        pImgFront.className = "p_imgFront";
        pImgClickHandlerContainer.appendChild(pImgFront);

        // PRODUCT NAME CONTAINER
        let pNameContainer = document.createElement("div");
        pNameContainer.className = "p_nameContainer";
        item.appendChild(pNameContainer);

        // PRODUCT NAME
        let pName = document.createElement("product");
        pName.textContent = product.name;
        pName.className = "p_name";
        pNameContainer.appendChild(pName);

        // PRODUCT PRICE CONTAINER
        let pPriceContainer = document.createElement("div");
        pPriceContainer.className = "p_priceContainer";
        item.appendChild(pPriceContainer);

        // PRODUCT PRICE
        let pPrice = document.createElement("product");
        pPrice.textContent = product.price + " лв.";
        pPrice.className = "p_price";
        pPriceContainer.appendChild(pPrice);

        // PRODUCT ATC CONTAINER (ATC == Add To Cart)
        let pAtcContainer = document.createElement("div");
        pAtcContainer.className = "p_AtcContainer";
        item.appendChild(pAtcContainer);

        // PRODUCT ATC ICON
        let pAtcIcon = document.createElement("img");
        pAtcIcon.src = "images/addToCartIcon.png";
        pAtcIcon.className = "p_AtcIcon";
        pAtcContainer.appendChild(pAtcIcon);

        // PRODUCT ATC INPUT
        let pAtcInput = document.createElement("input");
        pAtcInput.type = "button";
        pAtcInput.value = "";
        pAtcInput.className = "cart p_AtcInput";
        pAtcInput.addEventListener("click", atc.bind(this, id));
        pAtcContainer.appendChild(pAtcInput);

        // CHECK IF PRODUCT IS NEW
        if (product.new === true) {
            // PRODUCT NEW CONTAINER
            let pNew = document.createElement("div");
            pNew.className = "p_new";
            item.appendChild(pNew);

            // PRODUCT NEW TEXT
            let pNewText = document.createElement("product");
            pNewText.textContent = "НОВО";
            pNewText.className = "p_newText";
            pNew.appendChild(pNewText);
        }
    }
}