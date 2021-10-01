var buyNow = {
    price: 0,
    // cartItems: JSON.parse(localStorage.getItem("cart")),
    init: function () {
        checkout.price = Number(/*products[index].price*/ null);


        let itemsString = "";
        itemsString += `ID: #${/*products[index].id*/ null} | БРОЙ: 1 | ЦЕНА: ${/*products[index].price*/ null} лв. | ИМЕ: ${/*products[index].name*/ null}`



        let buyNowItem = document.getElementById("buy_now_item");
        buyNowItem.value = itemsString;

    }
};
window.addEventListener("DOMContentLoaded", checkout.init); //? On load --> checkout.init()
