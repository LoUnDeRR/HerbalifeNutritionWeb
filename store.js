var activeId;
var cart = {
  // $$ (A) PROPERTIES
  hPdt: null, // HTML products list
  hItems: null, // HTML current cart
  items: {}, // Current items in cart
  iURL: "images/", // Product image URL folder

  // $$ (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // (B3) EMPTY ENTIRE CART
  nuke: function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // $$ (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart_products");
    cart.hItems = document.getElementById("cart_items");

    // (C2) CREATE PRODUCTS
    cart.hPdt.innerHTML = "";
    let product, item;
    for (let id in products) {
      // ITEM
      product = products[id];
      item = document.createElement("div");
      item.className = "p_item";
      cart.hPdt.appendChild(item);

      // PRODUCT IMAGE AND CLICK HANDLER CONTAINER
      let pImgClickHandlerContainer = document.createElement("div");
      pImgClickHandlerContainer.className = "p_imgClickHandlerContainer";
      item.appendChild(pImgClickHandlerContainer);

      // PRODUCT CLICK HANDLER
      let pClickHandler = document.createElement("a");
      pClickHandler.addEventListener('click', function () {
        activeId = id;
        OpenOverlay();
      });
      pClickHandler.className = "p_clickHandler";
      pImgClickHandlerContainer.appendChild(pClickHandler);

      // PRODUCT IMAGE BACK
      let pImgBack = document.createElement("img");
      if (product.images[1] != null) {
        pImgBack.src = cart.iURL + product.images[1];
      } else {
        pImgBack.src = cart.iURL + product.images[0];
      }
      pImgBack.className = "p_imgBack";
      pImgClickHandlerContainer.appendChild(pImgBack);

      // PRODUCT IMAGE FRONT
      let pImgFront = document.createElement("img");
      pImgFront.src = cart.iURL + product.images[0];
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
      pAtcIcon.src = cart.iURL + "addToCartIcon.png";
      pAtcIcon.className = "p_AtcIcon";
      pAtcContainer.appendChild(pAtcIcon);

      // PRODUCT ATC INPUT
      let pAtcInput = document.createElement("input");
      pAtcInput.type = "button";
      pAtcInput.value = "";
      pAtcInput.className = "cart p_AtcInput";
      pAtcInput.onclick = cart.add;
      pAtcInput.dataset.id = id;
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

    // (C3) LOAD CART FROM PREVIOUS SESSION
    cart.load();

    // (C4) LIST CURRENT CART ITEMS
    cart.list();

    // (C5) SETUP OVERLAY CLOSING FUNCTIONS
    CloseOverlaySetup();
  },

  // $$ (D) LIST CURRENT CART ITEMS (IN HTML)
  list: function () {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let product, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        product = products[id];
        item = document.createElement("div");
        item.className = "c_item";
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = product.name;
        part.className = "c_name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c_del cart";
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c_qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        // SUBTOTAL
        subtotal = cart.items[id] * product.price;
        total += subtotal;
      }

      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c_total";
      item.id = "c_total";
      item.innerHTML = "TOTAL: $" + total;
      cart.hItems.appendChild(item);

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.className = "c_empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c_checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // $$ (E) ADD ITEM INTO CART
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();

    // DISPLAY ATC ALERT
    atcAlert();
  },

  // $$ (F) CHANGE QUANTITY
  change: function () {
    // (F1) REMOVE ITEM
    if (this.value <= 0) {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    }

    // (F2) UPDATE TOTAL ONLY
    else {
      cart.items[this.dataset.id] = this.value;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c_total").innerHTML = "TOTAL: $" + total;
      }
    }
  },

  // $$ (G) REMOVE ITEM FROM CART
  remove: function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // $$ (H) CHECKOUT
  checkout: function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("TO DO");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  }
};
window.addEventListener("DOMContentLoaded", cart.init);

// $$ CREATE HTML STRUCTURE FOR AN ALERT
function atcAlert() {
  let alertATC = document.createElement('div');
  alertATC.className = 'alertATC'
  document.querySelector('#alert_flexbox').prepend(alertATC);

  let spanATC = document.createElement('span');
  spanATC.textContent = "Добавено в количката"
  alertATC.appendChild(spanATC);

  // REMOVE HTML AFTER X MILLISECONDS
  setTimeout(function () {
    alertATC.parentNode.removeChild(alertATC);
  }, 3500);
}

// $$ ADD ITEM TO CART
function atc() {
  if (cart.items[activeId] == undefined) {
    cart.items[activeId] = 1;
  } else {
    cart.items[activeId]++;
  }
  cart.save();
  cart.list();
  
  atcAlert();
}