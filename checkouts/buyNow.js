var buyNow = {
    init: function () {
        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");
        const price = params.get("price");
        const name = params.get("name");


        document.getElementById("checkout_product_price").textContent = price;

        let buyNowItem = document.getElementById("buy_now_item");
        buyNowItem.value = `ID: #${id} | БРОЙ: 1 | ЦЕНА: ${price} | ИМЕ: ${name}\n`;
    },
    submit: function () {
        let buyBtn = document.getElementById("buy_container");
        let fields = document.getElementsByClassName("inputField");
        for (let index = 0; index < fields.length; index++) {
            console.log();
            if (fields[index].value == "" || fields[index].value == null) {
                alert("Количката е празна или не са попълнени текстовите полета!")
                return 0;
            }
        }
        buyBtn.parentNode.submit()

    }
};
window.addEventListener("DOMContentLoaded", buyNow.init); //? On load --> buyNow.init()
