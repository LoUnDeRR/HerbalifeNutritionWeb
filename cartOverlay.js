var sum = 0;
function OpenCartOverlay() {
    document.getElementById('open_cart_overlay').style.display = 'flex';
    let productsFlex = document.getElementById('co_products_flex');

    for (let index in cart.items) {
        let eachProduct = products[index]
        console.log(eachProduct);
        let productContainer = document.createElement('div');
        productContainer.className = "co_product_container p" + index;
        productsFlex.appendChild(productContainer);

        let removeBtn = document.createElement('img');
        removeBtn.src = "images/removeFromCart.svg";
        removeBtn.className = "co_products_remove_icon";
        removeBtn.addEventListener("click", RemoveP.bind(this, index));
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
        productIncrease.addEventListener("click", IncreasePAmount.bind(this, index));
        productContainer.appendChild(productIncrease);

        let productCount = document.createElement('span');
        productCount.className = "co_products_product_count p" + index;
        productCount.textContent = cart.items[index];
        productContainer.appendChild(productCount);
        //TODO product count

        let productDecrease = document.createElement('img');
        productDecrease.className = "co_products_product_decrease";
        productDecrease.src = "images/rightArrow.svg";
        productDecrease.addEventListener("click", DecreasePAmount.bind(this, index));
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
        sum += cart.items[index] * eachProduct.price;
        productPriceBox.appendChild(productPrice);
    }
    document.getElementById("co_total_price_text").textContent = sum.toFixed(2) + " лв.";
    CartIsEmpty();
}

function IncreasePAmount(index) {
    cart.items[index]++;
    console.log(index);
    document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
    document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";
   
    sum += products[index].price;
    console.log(sum);
    document.getElementById("co_total_price_text").textContent = sum.toFixed(2) + " лв.";

    localStorage.setItem("cart", JSON.stringify(cart.items));
}
function DecreasePAmount(index) {
    if (cart.items[index] > 1) {
        cart.items[index]--;
        document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
        document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";

        sum -= products[index].price;
        document.getElementById("co_total_price_text").textContent = sum.toFixed(2) + " лв.";

        localStorage.setItem("cart", JSON.stringify(cart.items));
        CartIsEmpty();
    }
}
function RemoveP(index) {
    let productMainContainer = document.getElementsByClassName("co_product_container p" + index)[0];
    productMainContainer.parentNode.removeChild(productMainContainer);
    delete cart.items[index];
    localStorage.setItem("cart", JSON.stringify(cart.items));
    console.log(cart.items[index]);
    CartIsEmpty();
}
function CartIsEmpty() {
    let productsFlex = document.getElementById("co_products_flex");
    if (productsFlex.children[0] == null) {
        document.getElementById("co_products_container").style.display = 'none';
        document.getElementById("co_continue_container").style.display = 'none';
        document.getElementById("cart_empty_msg").style.display = 'block';
        document.getElementById("cart_empty_img").style.display = 'block';
    }
    else {
        document.getElementById("co_products_container").style.display = 'block';
        document.getElementById("co_continue_container").style.display = 'flex';
        document.getElementById("cart_empty_msg").style.display = 'none';
        document.getElementById("cart_empty_img").style.display = 'none';
    }
}