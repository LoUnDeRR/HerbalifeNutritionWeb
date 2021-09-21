var cart = {
  activeId: null, //? activeId == opened last/current product
  items: {}, //? Current items in cart

  // !LOCALSTORAGE CART
  // SAVE CART ITEMS TO LOCAL STORAGE
  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // LOAD CART ITEMS FROM LOCALSTORAGE
  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // INITIALIZE
  init: function () {
    // CONSTRUCT STORE PRODUCTS
    productsConstruction();
    cart.load();

    // CART BUTTON
    document.getElementById('open_cart_button').addEventListener("click", function () {
      OpenCartOverlay();
    });

    // CLOSE OVERLAY SETUP
    CloseOverlaySetup();
  }
};
window.addEventListener("DOMContentLoaded", cart.init); //? On load --> cart.init()

// ADD TO CART
function atc(productId) {
  let id;
  if (productId != null) {  //? if added from product btn -> id = productId; if added from overlay id = activeId
    id = productId;
  } else {
    id = cart.activeId;
  }

  if (cart.items[id] == undefined) {  //? if is first -> product count = 1;
    cart.items[id] = 1;
  } else {
    cart.items[id]++;
  }

  cart.save();
  atcAlert();
}


// * CHECKOUT PLAN

//* SEND DATA TO SERVER
//* CHECKS
//* SEND AN EMAIL
//* RECORD TO DATABASE
//* PAYMENT
//* WHATEVER IS REQUIRED


//* var data = new FormData();
//* data.append('cart', JSON.stringify(cart.items));
//* data.append('products', JSON.stringify(products));
//* var xhr = new XMLHttpRequest();
//* xhr.open("POST", "SERVER-SCRIPT");
//* xhr.onload = function(){ ... };
//* xhr.send(data);
