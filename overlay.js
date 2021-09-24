var overlay = {
    openProduct: function () {
        //? Build the HTML overlay 
        let product = products[cart.activeId];
        let productOverlay = document.getElementById("open_product_overlay");
        productOverlay.style.display = "flex";
        let title = document.getElementById("o_title");
        title.innerHTML = product.name;
        let description = document.getElementById("o_description")
        description.innerHTML = product.description;
        let price = document.getElementById("o_price")
        price.children[0].innerHTML = product.price + " лв.";
        if (products[cart.activeId].new === false) {
            document.getElementById('o_new').style.display = "none";
        } else {
            document.getElementById('o_new').style.display = "block";
        }

        //? Create images in HTML for the slider
        for (let index = 0; index < product.images.length; index++) {
            let liImg = document.createElement("li");
            document.getElementById('slider').appendChild(liImg);

            let slideshowImage = document.createElement("img")
            slideshowImage.src = 'images/' + product.images[index];
            liImg.appendChild(slideshowImage);
        }

        slideshow.buildSlider();

        //? Buttons functionality
        overlay.buyOverlay();
        overlay.atcOverlay(); 
    },

    closeOverlayInit: function () {
        let overlayCloseFnc = document.getElementsByClassName('o_close_fnc_call');
        for (const element of overlayCloseFnc) {
            element.addEventListener("click", function (closeOverlay) {
                if (closeOverlay.target === element) {
                    document.getElementById("open_product_overlay").style.display = 'none';
                    document.getElementById("open_cart_overlay").style.display = 'none';

                    document.getElementById('o_add_to_cart_container').removeEventListener("click", overlay.atcOverlayHandler);
                    document.getElementById('o_buy_container').removeEventListener("click", cart.buy);

                    document.getElementById("co_products_flex").innerHTML = "";

                    slideshow.destroySlideshow();
                }
            });
        }
    },

    atcOverlayHandler: null,
    atcOverlay: function () {
        let AtcFnc = document.getElementById('o_add_to_cart_container');
        overlay.atcOverlayHandler = cart.atc.bind(this, cart.activeId);
        AtcFnc.addEventListener("click", overlay.atcOverlayHandler);
    },

    buyOverlay: function () {
        let buyFnc = document.getElementById('o_buy_container');
        buyFnc.addEventListener("click", cart.buy);
    },




    totalSum: 0,

    openCart: function () {
        document.getElementById('open_cart_overlay').style.display = 'flex';
        cartOverlayConstruction();
        overlay.cartIsEmpty();
    },

    increasePAmount: function (index) {
        cart.items[index]++;
        document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
        document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";

        overlay.totalSum += products[index].price;
        document.getElementById("co_total_price_text").textContent = overlay.totalSum.toFixed(2) + " лв.";

        cart.save();
    },

    decreasePAmount: function (index) {
        if (cart.items[index] > 1) {
            cart.items[index]--;
            document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
            document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";

            overlay.totalSum -= products[index].price;
            document.getElementById("co_total_price_text").textContent = overlay.totalSum.toFixed(2) + " лв.";

            cart.save();

            overlay.cartIsEmpty();
        }
    },

    removeP: function (index) {
        let productMainContainer = document.getElementsByClassName("co_product_container p" + index)[0];
        overlay.totalSum -= products[index].price * cart.items[index];
        document.getElementById("co_total_price_text").textContent = overlay.totalSum.toFixed(2) + " лв.";
        productMainContainer.parentNode.removeChild(productMainContainer);
        delete cart.items[index];
        cart.save();
        overlay.cartIsEmpty();
    },

    cartIsEmpty: function () {
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

}
