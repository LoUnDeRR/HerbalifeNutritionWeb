var checkout = {
    total: 0,
    cartItems: JSON.parse(localStorage.getItem("cart")),
    init: function () {
        //? Count total
        let itemsString = "";
        for (let index = 0; index < Object.keys(checkout.cartItems).length; index++) {
            checkout.total += Number(checkout.cartItems[index] * products[index].price);
            itemsString += `ID: #${products[index].id} | БРОЙ: ${checkout.cartItems[index]} | ЦЕНА: ${products[index].price} лв. | ИМЕ: ${products[index].name} \n`
        }
        
        let inputItems = document.getElementById("checkoutInputItems");
        inputItems.value = itemsString;

        //
        document.getElementById("checkout_total_price").textContent = checkout.total;
        for (let index = 0; index < Object.keys(checkout.cartItems).length; index++) {
            let itemsList = document.getElementById("checkoutItems");
            let listElement = document.createElement('li');

            let product = products[index];
            listElement.textContent = `[${index}] # ` + product.id + " >>> " + product.name + " >>> " + product.price;
            itemsList.appendChild(listElement);
        }
        //
    }
};
window.addEventListener("DOMContentLoaded", checkout.init); //? On load --> checkout.init()
