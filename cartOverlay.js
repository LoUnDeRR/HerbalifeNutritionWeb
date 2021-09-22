// // TODO optimize - turn into interface and merge into overlay.js

// var sum = 0;
// function OpenCartOverlay() {
//     document.getElementById('open_cart_overlay').style.display = 'flex';
//     cartOverlayConstruction();
//     CartIsEmpty();
// }

// function IncreasePAmount(index) {
//     cart.items[index]++;
//     document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
//     document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";
   
//     sum += products[index].price;
//     document.getElementById("co_total_price_text").textContent = sum.toFixed(2) + " лв.";

//     localStorage.setItem("cart", JSON.stringify(cart.items));
// }
// function DecreasePAmount(index) {
//     if (cart.items[index] > 1) {
//         cart.items[index]--;
//         document.getElementsByClassName("co_products_product_count p" + index)[0].textContent = cart.items[index];
//         document.getElementsByClassName("co_products_product_price p" + index)[0].textContent = (products[index].price * cart.items[index]).toFixed(2) + " лв.";

//         sum -= products[index].price;
//         document.getElementById("co_total_price_text").textContent = sum.toFixed(2) + " лв.";

//         localStorage.setItem("cart", JSON.stringify(cart.items));
//         CartIsEmpty();
//     }
// }
// function RemoveP(index) {
//     let productMainContainer = document.getElementsByClassName("co_product_container p" + index)[0];
//     productMainContainer.parentNode.removeChild(productMainContainer);
//     delete cart.items[index];
//     localStorage.setItem("cart", JSON.stringify(cart.items));
//     CartIsEmpty();
// }
// function CartIsEmpty() {
//     let productsFlex = document.getElementById("co_products_flex");
//     if (productsFlex.children[0] == null) {
//         document.getElementById("co_products_container").style.display = 'none';
//         document.getElementById("co_continue_container").style.display = 'none';
//         document.getElementById("cart_empty_msg").style.display = 'block';
//         document.getElementById("cart_empty_img").style.display = 'block';
//     }
//     else {
//         document.getElementById("co_products_container").style.display = 'block';
//         document.getElementById("co_continue_container").style.display = 'flex';
//         document.getElementById("cart_empty_msg").style.display = 'none';
//         document.getElementById("cart_empty_img").style.display = 'none';
//     }
// }