let iconCart = document.getElementById("cart")


// window.onload = fillCartItems();
// Функция для кнопки-степпера
function stepper(button) {
    let inputStepper = document.getElementById("input-stepper");
    let id = button.getAttribute("id");
    let min = inputStepper.getAttribute("min");
    let max = inputStepper.getAttribute("max");
    let step = inputStepper.getAttribute("step");
    let value = inputStepper.getAttribute("value");
    
    let calcStep = (id === "increment") ? (step*1) : (step*-1);
    let newValue = parseInt(value) + calcStep;
    
    if (newValue >= min && newValue <= max) {
        inputStepper.setAttribute("value", newValue);
    }
}

function changeSlider(thumb) {
    let slider = document.getElementById("slider");
    let href = thumb.getAttribute("src");
    
    let thumbnail = document.getElementsByClassName("thumbnail")[0];
    let images = thumbnail.getElementsByTagName("img");
    
    for (let thumb of images) {
        thumb.classList.remove("active-img");
    }
    
    thumb.classList.add("active-img");
    slider.setAttribute("src", href);
}

function addToCart(button) {
    // Получаем контейнер из локального хранилища
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`addToCart() orderedItems:${orderedItems}`);
    let items = (orderedItems)? JSON.parse(orderedItems) : [];
    
    // Собираем свойства для объекта
    let productName = document.getElementById("product-name").innerHTML;
    let productPrice = document.getElementById("product-price").innerHTML;
    productPrice = parseInt(productPrice.substr(0, productPrice.length-2).replaceAll(' ', '' ));
    let inputStepper = document.getElementById("input-stepper");
    let productImage = document.getElementById("slider").getAttribute("src");
    let productAmount = parseInt(inputStepper.getAttribute("value"));

    // Формируем объект
    let item = {
        name: productName,
        price: productPrice,
        amount: productAmount,
        href: productImage 
    }

    // Добавляем объект в контейнер
    let notfindSame = true;
    for (let i of items) {
        if (i.name === item.name) {
            i.amount += item.amount;
            notfindSame = false;
            break;
        }
    }
    if (notfindSame) items.push(item);
    
    // Обновляем контейнер в хранилище
    localStorage.setItem("orderedItems", JSON.stringify(items));
    
    console.log(`Add to cart: ${productName} ${productPrice} ${productAmount}`);
    console.log(items);

    // Заполняем корзину
    fillCartItems();
    let checkBox = document.getElementById("cart")
    checkBox.checked = true;
}

function fillCartItems() {
    // Отобразить заполненность корзины
    showCart();

    // Получаем контейнер из локального хранилища
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`fillCartItems() orderedItems:${orderedItems}`);
    let items = (orderedItems)? JSON.parse(orderedItems) : [];

    if (items.length === 0) {
        showCartIcon = false;
        let cartIcon = document.getElementById("mark-cartbtn");
        cartIcon.style.display = "none";
        let itemsListElement = document.querySelector(".list");
        if (!document.querySelector(".empty-list-state")) {

            let emptyListState = document.createElement("div");
            emptyListState.classList.add("empty-list-state");
            emptyListState.innerHTML = "Пока что корзина пуста";
            itemsListElement.append(emptyListState);

        }

        let buttonCheckout = document.querySelector(".button-checkout");
        if (buttonCheckout) buttonCheckout.remove();
    }

    else {

        let itemsListElement = document.querySelector(".list");
        let cartItemsList = document.querySelector(".cart-items-list");
        if (itemsListElement) itemsListElement.remove();
        
        let emptyState = document.querySelector(".empty-list-state");
        if (emptyState) emptyState.remove();

        let buttonCheckout = document.querySelector(".button-checkout");
        if (buttonCheckout) buttonCheckout.remove();

        buttonCheckout = document.createElement("div");
        buttonCheckout.classList.add("button-checkout");

        buttonCheckout.innerHTML = `
        <a href = "../pages/order.html">
        <button type="submit" id="checkout" name="check" class="button-primary">
        <p>Оформить заказ</p>
        </button>
        </a>
        `;

        itemsListElement = document.createElement("div");
        itemsListElement.classList.add("list");

        for (let item of items) {
            let newElement = createCartItem(item);
            itemsListElement.append(newElement);
        }
        cartItemsList.append(itemsListElement);
        cartItemsList.append(buttonCheckout);
    }

    fillFooter();
}

function createCartItem(item) {
    let divCartItem = document.createElement("div");
    divCartItem.classList.add("cart-item");


    divCartItem.innerHTML = `
    <a href="../products/${item.name}.html"><img src="${item.href}"></a>
        <div class="cart-item-data">
            <div class="item-data-header">
                <h4 class="item-name">${item.name}</h4>
                <label class="removebtn" onclick="removeItem(this)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                    </label>
            </div>
            <h4 class="item-amount-price">${item.amount} x ${item.price} ₽</h4>
            <h4 class="item-cost">${item.amount*item.price} ₽</h4>
        </div>
    `
    
    return divCartItem;
}

function fillCartItemsIndex() {
    // Отобразить заполненность корзины
    showCart();

    // Получаем контейнер из локального хранилища
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`fillCartItems() orderedItems:${orderedItems}`);
    let items = (orderedItems)? JSON.parse(orderedItems) : [];

    if (items.length === 0) {
        showCartIcon = false;
        let cartIcon = document.getElementById("mark-cartbtn");
        cartIcon.style.display = "none";
        let itemsListElement = document.querySelector(".list");
        if (!document.querySelector(".empty-list-state")) {

            let emptyListState = document.createElement("div");
            emptyListState.classList.add("empty-list-state");
            emptyListState.innerHTML = "Пока что корзина пуста";
            itemsListElement.append(emptyListState);

        }

        let buttonCheckout = document.querySelector(".button-checkout");
        if (buttonCheckout) buttonCheckout.remove();
    }

    else {

        let itemsListElement = document.querySelector(".list");
        let cartItemsList = document.querySelector(".cart-items-list");
        if (itemsListElement) itemsListElement.remove();
        
        let emptyState = document.querySelector(".empty-list-state");
        if (emptyState) emptyState.remove();

        let buttonCheckout = document.querySelector(".button-checkout");
        if (buttonCheckout) buttonCheckout.remove();

        buttonCheckout = document.createElement("div");
        buttonCheckout.classList.add("button-checkout");

        buttonCheckout.innerHTML = `
        <a href = "pages/order.html">
        <button type="submit" id="checkout" name="check" class="button-primary">
        <p>Оформить заказ</p>
        </button>
        </a>
        `;

        itemsListElement = document.createElement("div");
        itemsListElement.classList.add("list");

        for (let item of items) {
            let newElement = createCartItemIndex(item);
            itemsListElement.append(newElement);
        }
        cartItemsList.append(itemsListElement);
        cartItemsList.append(buttonCheckout);
    }

}

function createCartItemIndex(item) {
    let divCartItem = document.createElement("div");
    divCartItem.classList.add("cart-item");


    divCartItem.innerHTML = `
    <a href="products/${item.name}.html"><img src="${item.href.replace("../", "")}"></a>
        <div class="cart-item-data">
            <div class="item-data-header">
                <h4 class="item-name">${item.name}</h4>
                <label class="removebtn" onclick="removeItem(this)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                    </label>
            </div>
            <h4 class="item-amount-price">${item.amount} x ${item.price} ₽</h4>
            <h4 class="item-cost">${item.amount*item.price} ₽</h4>
        </div>
    `
    
    return divCartItem;
}



function showCart() {
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`showCart() orderedItems:${orderedItems}`);
    let arr = (orderedItems)? JSON.parse(orderedItems) : [];

    if (arr.length !== 0) {
        let cartIcon = document.getElementById("mark-cartbtn");
        cartIcon.style.display = "block";
    }

}

function removeItem(child) {
    let orderedItems = localStorage.getItem("orderedItems");
    console.log(`removeItem(child) orderedItems:${orderedItems}`);
    let items = (orderedItems)? JSON.parse(orderedItems) : [];
    
    parent = child.parentNode.parentNode.parentNode;
    productName = parent.querySelector(".item-name").innerText;
    console.log(productName);
    console.log(parent);

    for (let i = 0; i < items.length; ++i) {
        if (items[i].name === productName) {
            items.splice(i,1);
        }
    }


    console.log(`remove item:`, items);
    parent.remove();
    localStorage.setItem("orderedItems", JSON.stringify(items));
    if (items.length === 0) {
        showCartIcon = false;
        let cartIcon = document.getElementById("mark-cartbtn");
        cartIcon.style.display = "none";
        let itemsListElement = document.querySelector(".list");

        let emptyListState = document.createElement("div");
        emptyListState.classList.add("empty-list-state");
        emptyListState.innerHTML = "Пока что корзина пуста";
        itemsListElement.append(emptyListState);

        let buttonCheckout = document.querySelector(".button-checkout");
        if (buttonCheckout) buttonCheckout.remove();
    }

}

function fillFooter() {
    let footerContainer = document.querySelector(".footer-container");
    footerContainer.innerHTML = `
    <div class="wrapper">
    <footer>
        <div class="footer-table">
            <ul class="footer-column">
                <a class="logo" href="../">
                    Теремок
                </a>
            </ul>
            <ul class="footer-column">
                <li>
                    <h3>Быстрые ссылки</h3>
                </li>
                <li>
                    <a href="../pages/catalog.html">Каталог</a>
                </li>
                <li>
                    <a href="../pages/about.html">О нас</a>
                </li>
                <li>
                    <a href="../pages/frequently-asked-questions.html">FAQ</a>
                </li>
            </ul>
            <ul class="footer-column">
                <li>
                    <h3>Для связи</h3>
                </li>
                <li>
                    Понедельник - Пятница
                </li>
                <li>
                    09:00 - 15:00
                </li>
                <li>
                    <a href="tel:+79876543210">Т: +7(987)-654-32-10</a>
                </li>
            </ul>
            <ul class="footer-column">
                <li>
                    <h3>Разделы</h3>
                </li>
                <li>
                    <a href="../pages/catalog.html#classic">Классика</a>
                </li>
                <li>
                    <a href="../pages/catalog.html#kids">Самым маленьким</a>
                </li>
                <li>
                    <a href="../pages/catalog.html#constructor">Конструктор</a>
                </li>
                <li>
                    <a href="../pages/catalog.html#kids">Игрушки для обучения</a>
                </li>
                <li>
                    <a href="../pages/catalog.html#knitted">Вязанные игрушки</a>
                </li>
            </ul>
        </div>
    </footer>
</div>
    
    
    
    
    `
}







