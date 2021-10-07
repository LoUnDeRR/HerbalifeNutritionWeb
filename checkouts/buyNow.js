var buyNow = {
    init: function () {
        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");
        const price = params.get("price");
        const name = params.get("name");


        document.getElementById("checkout_product_price").textContent = price;

        let buyNowItem = document.getElementById("buy_now_item");
        buyNowItem.value = `ID: #${id} | БРОЙ: 1 | ЦЕНА: ${price} | ИМЕ: ${name}\n`;
    }
};
window.addEventListener("DOMContentLoaded", buyNow.init); //? On load --> checkout.init()
