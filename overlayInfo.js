function OpenOverlay() {
    let product = products[activeId];
    // OPEN OVERLAY
    let overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    let title = document.getElementById("o_title");
    title.innerHTML = product.name;
    let description = document.getElementById("o_description")
    description.innerHTML = product.description;
    let price = document.getElementById("o_price")
    price.children[0].innerHTML = product.price + " лв.";

    for (let index = 0; index < product.images.length; index++) {
        let liImg = document.createElement("li");
        document.getElementById('slider').appendChild(liImg);

        let slideshowImage = document.createElement("img")
        slideshowImage.src = 'images/' + product.images[index];
        liImg.appendChild(slideshowImage);
    }

    BuildSlider();

    BuyOverlay();
    AddToCartOverlay();
}

function CloseOverlay() {
    let overlayCloseFnc = document.getElementsByClassName('o_close_fnc');
    for (const element of overlayCloseFnc) {
        element.addEventListener("click", function (closeOverlay) {
            let overlay = document.getElementById("overlay");
            if (closeOverlay.target === element) {
                document.getElementById("slider").style.left = 0;
                overlay.style.display = 'none';
                destroySlider();
                document.getElementById('o_add_to_cart_container').removeEventListener("click", addToCartOverlayClick);
                document.getElementById('o_buy_container').removeEventListener("click", buyOverlayClick);
            }
        });
    }
}





function AddToCartOverlay() {
    // ADD TO CART OVERLAY
    let addToCartFnc = document.getElementById('o_add_to_cart_container');
    addToCartFnc.addEventListener("click", addToCartOverlayClick);
}

function addToCartOverlayClick() {
    alert(`Not implemented! (addToCartFnc) + ${activeId}`);
}




function BuyOverlay() {
    // BUY OVERLAY
    let buyFnc = document.getElementById('o_buy_container');
    buyFnc.addEventListener("click", buyOverlayClick);
}

function buyOverlayClick() {
    alert(`Not implemented! (buyFunc) + ${activeId}`);
}



































