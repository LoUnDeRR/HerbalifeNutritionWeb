var checkout = {
    total: 0,
    cartItems: JSON.parse(localStorage.getItem("cart")),
    init: function () {
        //? Count total
        let itemsString = "";
        for (const index of Object.keys(checkout.cartItems)) {
            console.log(`[${index}]` + checkout.cartItems[index] + " * " + products[index].price)
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
window.addEventListener("DOMContentLoaded", checkout.init); //? On load --> checkout.init()



// var stripe = Stripe('pk_test_51JdXF8Eim7eu7Uw3oruxBjoX6rVL7rTNV73T9nwPuNIEUufjbPLYjUAAr3G4CebXWyUnk5LNGyNbTu5ghviv6RXs00TKBX4lCs');
// var elements = stripe.elements();

// var card = elements.create('card', {
//   hidePostalCode: true,
//   style: {
//     base: {
//       iconColor: '#666EE8',
//       color: '#31325F',
//       lineHeight: '40px',
//       fontWeight: 300,
//       fontFamily: 'Helvetica Neue',
//       fontSize: '15px',

//       '::placeholder': {
//         color: '#CFD7E0',
//       },
//     },
//   }
// });
// card.mount('#card-element');

// function setOutcome(result) {
//   var successElement = document.querySelector('.success');
//   var errorElement = document.querySelector('.error');
//   successElement.classList.remove('visible');
//   errorElement.classList.remove('visible');

//   if (result.token) {
//     // In this example, we're simply displaying the token
//     successElement.querySelector('.token').textContent = result.token.id;
//     successElement.classList.add('visible');

//     // In a real integration, you'd submit the form with the token to your backend server
//     var form = document.querySelector('form');
//     form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
//     form.submit();
//   } else if (result.error) {
//     errorElement.textContent = result.error.message;
//     errorElement.classList.add('visible');
//   }
// }

// card.on('change', function(event) {
//   setOutcome(event);
// });

// document.querySelector('form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   var options = {
//     name: document.getElementById('first-name').value + " " + document.getElementById('last-name').value,
//     address_line1: document.getElementById('address-line1').value,
//     address_line2: document.getElementById('address-line2').value,
//     address_city: document.getElementById('address-city').value,
//     address_state: document.getElementById('address-state').value,
//     address_zip: document.getElementById('address-zip').value,
//     address_country: document.getElementById('address-country').value,
//   };
//   stripe.createToken(card, options).then(setOutcome);
// });