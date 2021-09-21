
function OpenProductOverlay() {
    //? Build the HTML overlay 
    let product = products[cart.activeId];
    let overlay = document.getElementById("open_product_overlay");
    overlay.style.display = "flex";
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

    BuildSlider();

    //? Buttons functionality
    BuyOverlay();
    AtcOverlay();
}

function CloseOverlaySetup() {
    let overlayCloseFnc = document.getElementsByClassName('o_close_fnc_call');
    for (const element of overlayCloseFnc) {
        element.addEventListener("click", function (closeOverlay) {
            if (closeOverlay.target === element) {
                document.getElementById("slider").style.left = 0;
                document.getElementById("open_product_overlay").style.display = 'none';
                document.getElementById("open_cart_overlay").style.display = 'none';
                document.getElementById("co_products_flex").innerHTML = "";
                destroySlideshow();
                document.getElementById('o_add_to_cart_container').removeEventListener("click", AtcOverlayClick);
                document.getElementById('o_buy_container').removeEventListener("click", buyOverlayClick);
            }
        });
    }
}


//? Atc = Add To Cart
function AtcOverlay() {
    let AtcFnc = document.getElementById('o_add_to_cart_container');
    AtcFnc.addEventListener("click", AtcOverlayClick);
}
function AtcOverlayClick() {
    atc();
}


function BuyOverlay() {
    let buyFnc = document.getElementById('o_buy_container');
    buyFnc.addEventListener("click", buyOverlayClick);
}
function buyOverlayClick() {
    alert(`Not implemented! (buyOverlayClick) index [${cart.activeId}] #${products[cart.activeId].id}`);
}
