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

    // // CART BUTTON
    // document.getElementById('open_cart_button').addEventListener("click", function () {
    //   overlay.openCart();
    // });

    // CHECKOUT SETUP
    overlay.checkout();

    // CLOSE OVERLAY SETUP
    overlay.closeOverlayInit();


    // main page open cart
    const params = new URLSearchParams(window.location.search);
    const cartState = params.get("cart");
    if (cartState == 'open') {
      overlay.openCart();
    }
  },

  // ADD TO CART
  atc: function (productId) {
    if (cart.items[productId] == undefined) {  //? if is first -> product count = 1;
      cart.items[productId] = 1;
    } else {
      cart.items[productId]++;
    }
    cart.save();
    atcAlert();
  },

  buy: function () {
    let redirectURL = '/checkouts/buyNow.html?id=' + products[cart.activeId].id + '&price=' + products[cart.activeId].price + '&name=' + products[cart.activeId].name;

    window.location.href = redirectURL;
  }
};
window.addEventListener("DOMContentLoaded", cart.init); //? On load --> cart.init()

//* CHECKOUT PLAN

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