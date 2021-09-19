function OpenCartOverlay() {
    document.getElementById('open_cart_overlay').style.display = 'flex';
    let productsFlex = document.getElementById('co_products_flex');

    for (const product of products) {
        let productContainer = document.createElement('div');
        productContainer.className = "co_product_container";
        productsFlex.appendChild(productContainer);

        let removeBtn = document.createElement('img');
        removeBtn.src = "images/removeFromCart.svg";
        removeBtn.className = "co_products_remove_icon";
        productContainer.appendChild(removeBtn);

        let productImage = document.createElement('img');
        productImage.src = "images/" + product.images[0];
        productImage.className = "co_products_product_image";
        productContainer.appendChild(productImage);

        let productName = document.createElement('span');
        productName.textContent = product.name;
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
        productCode2.textContent = product.id;
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
        productEachPrice2.textContent = product.price + " лв.";
        productEachPrice2.className = "co_products_product_each_price2";
        productEachPriceContainer.appendChild(productEachPrice2);

        let productDividerLeft = document.createElement('div');
        productDividerLeft.className = "co_products_product_divider_left";
        productContainer.appendChild(productDividerLeft);

        let productIncrease = document.createElement('img');
        productIncrease.className = "co_products_product_increase";
        productIncrease.src = "images/leftArrow.svg"
        productContainer.appendChild(productIncrease);

        let productCount = document.createElement('span');
        productCount.className = "co_products_product_count";
        productCount.textContent = "1";
        productContainer.appendChild(productCount);
        //TODO product count

        let productDecrease = document.createElement('img');
        productDecrease.className = "co_products_product_decrease";
        productDecrease.src = "images/rightArrow.svg"
        productContainer.appendChild(productDecrease);

        let productDividerRight = document.createElement('div');
        productDividerRight.className = "co_products_product_divider_right";
        productContainer.appendChild(productDividerRight);

        let productPriceBox = document.createElement('div');
        productPriceBox.className = "co_products_product_price_container";
        productContainer.appendChild(productPriceBox)

        let productPrice = document.createElement('price');
        productPrice.className = "co_products_product_price";
        productPrice.textContent = "47,95 лв." // amount * price
        productPriceBox.appendChild(productPrice);

    }

}