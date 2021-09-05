var cart = {
  // (A) PROPERTIES
  hPdt: null, // HTML products list
  hItems: null, // HTML current cart
  items: {}, // Current items in cart
  iURL: "images/", // Product image URL folder

  // (B) LOCALSTORAGE CART
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

  // (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    let p, item;
    let body = document.getElementById("body");
    for (let id in products) {
      // WRAPPER
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.hPdt.appendChild(item);

      // PRODUCT IMAGE CONTAINER
      let pImgContainer = document.createElement("div");
      pImgContainer.className = "p-imgContainer";
      item.appendChild(pImgContainer);

      // PRODUCT HREF
      let pHref = document.createElement("a");
      pHref.href = "#";
      pHref.className = "p-href";
      pImgContainer.appendChild(pHref);

      // PRODUCT IMAGE2
      let pImg2 = document.createElement("img");
      pImg2.src = cart.iURL + p.img2;
      pImg2.className = "p-img2";
      pImgContainer.appendChild(pImg2);

      // PRODUCT IMAGE
      let pImg = document.createElement("img");
      pImg.src = cart.iURL + p.img;
      pImg.className = "p-img";
      pImgContainer.appendChild(pImg);

      // *PRODUCT NAME CONTAINER
      let pNameContainer = document.createElement("div");
      pNameContainer.className = "p-nameContainer";
      item.appendChild(pNameContainer);

      // *PRODUCT PRICE BOX
      let pPriceBox = document.createElement("div");
      pPriceBox.className = "p-priceBox";
      item.appendChild(pPriceBox);

      // *PRODUCT PRICE
      let pPrice = document.createElement("p");
      pPrice.textContent = p.price + " лв.";
      pPrice.className = "p-price";
      pPriceBox.appendChild(pPrice);

      // *PRODUCT ADD TO CART BOX
      let pAddToCartBox = document.createElement("div");
      pAddToCartBox.className = "p-addToCartBox";
      item.appendChild(pAddToCartBox);

      // *PRODUCT ADD TO CART ICON
      let pAddToCartIcon = document.createElement("img");
      pAddToCartIcon.src = "images/addToCart.png";
      pAddToCartIcon.className = "p-addToCartIcon";
      pAddToCartBox.appendChild(pAddToCartIcon);

      // INPUT ADD TO CART
      let pAddToCartInput = document.createElement("input");
      pAddToCartInput.type = "button";
      pAddToCartInput.value = "";
      pAddToCartInput.className = "cart p-addToCartInput";
      pAddToCartInput.onclick = cart.add;
      pAddToCartInput.dataset.id = id;
      pAddToCartBox.appendChild(pAddToCartInput);



      // *PRODUCT NAME
      let pName = document.createElement("p");
      pName.textContent = p.name;
      pName.className = "p-name";
      pNameContainer.appendChild(pName);

      if (p.new == true) {
        // *PRODUCT NEW
        let pNew = document.createElement("div");
        pNew.className = "p-new";
        item.appendChild(pNew);

        // *PRODUCT NEW TEXT
        let pNewText = document.createElement("p");
        pNewText.textContent = "НОВО";
        pNewText.className = "p-newp";
        pNew.appendChild(pNewText);
      }

      // CLICK EVENT LISTENER
      pHref.addEventListener("click", function () {
        // DIM
        let oDim = document.createElement("div");
        oDim.className = "o-dim overlay";
        body.appendChild(oDim);

        // FRAME
        let oFrame = document.createElement("div");
        oFrame.className = "o-frame overlay";
        oDim.appendChild(oFrame);

        // FRAME CLOSE
        let oFrameClose = document.createElement("img");
        oFrameClose.className = "o-frameClose overlay";
        oFrameClose.src = 'images/close.svg'; // CHANGE
        oFrame.appendChild(oFrameClose);
        oFrameClose.onclick = function closeOverlay() {
          document.querySelectorAll('.overlay').forEach(e => e.remove());
        }
        
        // PRODUCT IMGS CONTAINER
        let oImgContainer = document.createElement("div");
        oImgContainer.className = "o-imgContainer";
        oImgContainer.src = cart.iURL + p.img;
        oFrame.appendChild(oImgContainer);

        // PRODUCT IMG MAIN
        let oImgMain = document.createElement("img");
        oImgMain.className = "o-imgMain";
        oImgMain.src = cart.iURL + p.img;
        oImgContainer.appendChild(oImgMain);

        // PRODUCT IMGS FLEX
        let oImgsFlex = document.createElement("div");
        oImgsFlex.className = "o-imgsFlex overlay";
        oImgContainer.appendChild(oImgsFlex);

        // let oImg2 = document.createElement("img");
        // oImg2.className = "o-img2";
        // oImg2.src = p.img;

        // if (p.img2 != null) {

        // }
        // let oImg1 = document.createElement("img");
        // oImgMain.className = "o-img1";
        // oImgMain.src = p.img;
        // let oImg1 = document.createElement("img");
        // oImgMain.className = "o-img1";
        // oImgMain.src = p.img;

      });
    }

    // (C3) LOAD CART FROM PREVIOUS SESSION
    cart.load();

    // (C4) LIST CURRENT CART ITEMS
    cart.list();
  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
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
      let p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML = "TOTAL: $" + total;
      cart.hItems.appendChild(item);

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // (E) ADD ITEM INTO CART
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
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
        document.getElementById("c-total").innerHTML = "TOTAL: $" + total;
      }
    }
  },

  // (G) REMOVE ITEM FROM CART
  remove: function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
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