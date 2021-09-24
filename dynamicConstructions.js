function productsConstruction() {
    //! GENERATE PRODUCTS
    let cartProducts = document.getElementById("cart_products");
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
            overlay.openProduct();
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
        pAtcInput.addEventListener("click", cart.atc.bind(this, id));
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

function cartOverlayConstruction() {
    let productsFlex = document.getElementById('co_products_flex');

    for (let index in cart.items) {
        let eachProduct = products[index]

        let productContainer = document.createElement('div');
        productContainer.className = "co_product_container p" + index;
        productsFlex.appendChild(productContainer);

        let removeBtn = document.createElement('img');
        removeBtn.src = "images/removeFromCart.svg";
        removeBtn.className = "co_products_remove_icon";
        removeBtn.addEventListener("click", overlay.removeP.bind(this, index));
        productContainer.appendChild(removeBtn);

        let productImage = document.createElement('img');
        productImage.src = "images/" + eachProduct.images[0];
        productImage.className = "co_products_product_image";
        productContainer.appendChild(productImage);

        let productName = document.createElement('span');
        productName.textContent = eachProduct.name;
        productName.className = "co_products_product_name";
        productContainer.appendChild(productName);

        let productCodeContainer = document.createElement('div');
        productCodeContainer.className = "co_products_product_code_container";
        productContainer.appendChild(productCodeContainer);

        let productCode = document.createElement('span');
        productCode.textContent = "Код на продукта: ";
        productCode.className = "co_products_product_code";
        productCodeContainer.appendChild(productCode);

        let productCode2 = document.createElement('span');
        productCode2.textContent = eachProduct.id;
        productCode2.className = "co_products_product_code2";
        productCodeContainer.appendChild(productCode2);

        let productEachPriceContainer = document.createElement('div');
        productEachPriceContainer.className = "co_products_product_each_price_container";
        productContainer.appendChild(productEachPriceContainer);

        let productEachPrice = document.createElement('span');
        productEachPrice.textContent = "Цена: ";
        productEachPrice.className = "co_products_product_each_price";
        productEachPriceContainer.appendChild(productEachPrice);

        let productEachPrice2 = document.createElement('span');
        productEachPrice2.textContent = eachProduct.price.toFixed(2) + " лв.";
        productEachPrice2.className = "co_products_product_each_price2";
        productEachPriceContainer.appendChild(productEachPrice2);

        let productDividerLeft = document.createElement('div');
        productDividerLeft.className = "co_products_product_divider_left";
        productContainer.appendChild(productDividerLeft);

        let productIncrease = document.createElement('img');
        productIncrease.className = "co_products_product_increase";
        productIncrease.src = "images/leftArrow.svg";
        productIncrease.addEventListener("click", overlay.increasePAmount.bind(this, index));
        productContainer.appendChild(productIncrease);

        let productCount = document.createElement('span');
        productCount.className = "co_products_product_count p" + index;
        productCount.textContent = cart.items[index];
        productContainer.appendChild(productCount);

        let productDecrease = document.createElement('img');
        productDecrease.className = "co_products_product_decrease";
        productDecrease.src = "images/rightArrow.svg";
        productDecrease.addEventListener("click", overlay.decreasePAmount.bind(this, index));
        productContainer.appendChild(productDecrease);

        let productDividerRight = document.createElement('div');
        productDividerRight.className = "co_products_product_divider_right";
        productContainer.appendChild(productDividerRight);

        let productPriceBox = document.createElement('div');
        productPriceBox.className = "co_products_product_price_container";
        productContainer.appendChild(productPriceBox)

        let productPrice = document.createElement('price');
        productPrice.className = "co_products_product_price p" + index;
        productPrice.textContent = (cart.items[index] * eachProduct.price).toFixed(2) + " лв.";
        overlay.totalSum += cart.items[index] * eachProduct.price;
        productPriceBox.appendChild(productPrice);
    }
    document.getElementById("co_total_price_text").textContent = overlay.totalSum.toFixed(2) + " лв.";

}