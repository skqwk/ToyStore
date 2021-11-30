let nameField = document.getElementById("nameField");
let emailField = document.getElementById("emailField");
let phoneField = document.getElementById("phoneField");
console.log(emailField);

emailField.addEventListener('keyup', function (event) {
    isValidEmail = emailField.checkValidity();
    console.log(event.key)
    if ( isValidEmail ) {
        emailField.classList.remove("invalid")
        emailField.classList.add("valid")
        console.log("Good");
    } else {
        console.log("Bad");
        emailField.classList.remove("valid")
        emailField.classList.add("invalid")
    }
  });

nameField.addEventListener('keyup', function (event) {
isValidName = nameField.checkValidity();
console.log(event.key)
if ( isValidName ) {
    nameField.classList.remove("invalid")
    nameField.classList.add("valid")
    console.log("Good");
} else {
    console.log("Bad");
    nameField.classList.remove("valid")
    nameField.classList.add("invalid")
}
});

phoneField.addEventListener('keyup', function (event) {
    isValidPhone = phoneField.checkValidity();
    console.log(event.key)
    if ( isValidPhone ) {
        phoneField.classList.remove("invalid")
        phoneField.classList.add("valid")
        console.log("Good");
    } else {
        console.log("Bad");
        phoneField.classList.remove("valid")
        phoneField.classList.add("invalid")
    }
  });

// {/* <input type="number"  name="points" value="1" max="100" min="1"></input> */}

function fillOrder() {
    console.log("fillOrder");
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`removeItem(child) orderedItems:${orderedItems}`);
    let items = (orderedItems)? JSON.parse(orderedItems) : [];

    let orderList = document.querySelector(".order-list");

    let counter = 0;
    let cost = 0;
    for (let item of items) {
        counter++;
        cost += item.price * item.amount;
        let orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
        <div class="product">
            <img src="${item.href}" alt="">
            <p class="product-name">${item.name}</p>
        </div>
        <p class="product-amount">${item.amount}</p>
        <p class="product-price">${item.price} ₽</p>
        <p class="product-cost">${item.price * item.amount} ₽</p>
        `
        orderList.append(orderItem);
    }

    let orderDetails = document.querySelector(".order-details");

    orderDetails.innerHTML = `
    <div class="order-details-items">
        <p>Стоимость заказа (${counter}) шт.</p>
        <p>${cost} ₽</p>
    </div>
    <div class="order-details-items">
        <p>Доставка</p>
        <p>${cost > 3000? "Бесплатно" : 500 + " ₽"}</p>
    </div>
    <div class="order-details-items">
        <h3>Весь заказ</h3>
        <h3>${cost > 3000? cost : cost+500} ₽</h3>
    </div>
    
    `

}

function submitOrder() {
    alert("Success!");
    let items = [];
    localStorage.setItem("orderedItems", JSON.stringify(items));
    return true;
}



