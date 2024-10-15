/* Display Cart */

const cartIcon = document.querySelector('.icon-cart');
const cartCloseButton = document.querySelector('.close-btn');

const body = document.querySelector('body');

cartIcon.addEventListener('click', () => {
    body.classList.toggle('show-cart')
})

cartCloseButton.addEventListener('click', () => {
    body.classList.toggle('show-cart')
})

function preventDefaultBehavior(event) {
    event.preventDefault();
}

// Up Button

let spanElement = document.getElementById('up-btn');

window.onscroll = function () {
    if (this.scrollY >= 600) {
        spanElement.classList.add('show')
    } else {
        spanElement.classList.remove('show')
    }
}

spanElement.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
})

// Hamburger Menu

const hamburgerMenubutton = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');
const navbarCloseButton = document.getElementById('close-mark');

if (hamburgerMenubutton) {
    hamburgerMenubutton.addEventListener('click', function () {
        navbar.classList.add('active');
    })
}

if (navbarCloseButton) {
    navbarCloseButton.addEventListener('click', function () {
        navbar.classList.remove('active');
    })
}


/* Image Slideshow */

const sliderImages = document.getElementById("slide-images");
const slideIcons = document.querySelectorAll('.slide-icon');

let slideNumber = 0;
let duration = 4000;

let images = [];

function changeImage() {
    setTimeout(changeImage, duration);
    slideIcons[slideNumber].classList.remove('active');

    sliderImages.src = images[slideNumber];
    slideNumber < images.length - 1 ? slideNumber++ : slideNumber = 0;

    slideIcons[slideNumber].classList.add('active');
}

function plusSlides(n) {
    slideIcons[slideNumber].classList.remove('active');

    slideNumber = (slideNumber + n + images.length) % images.length;;
    sliderImages.src = images[slideNumber];

    slideIcons[slideNumber].classList.add('active');
}

/* Fetching Local data */

function fetchHeroImages() {
    fetch('/hero_images.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(banner => {
                images.push(banner.image);
            });
        });
}

/* Fetching Data */

let productsList = [];
const productsListHTML = document.querySelector('#product1');
const productsContainer = document.querySelector('.pro-container');

const addDataToHTML = () => {
    if (productsList.length > 0) {
        productsList.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('pro');
            newProduct.dataset.id = product.id
            newProduct.innerHTML = `
                <img src="${product.images[0]}"
                    alt="${product.title}">
                <span>${product.brand}</span>
                <div class="desc">
                    <h5>${product.description.split(' ').slice(0, 12).join(' ').trim()}</h5>
                </div>
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="price-cart-container">
                    <h4>$${product.price}</h4>
                    <span class="add-to-cart-btn"> <i class="fa-solid fa-cart-plus add-to-cart-btn-icon" onclick="addItemToCart(event)"></i> </span>
                </div>
            `;
            productsContainer.appendChild(newProduct)

        })
    }
}


function fetchJSONData() {

    fetch(`https://dummyjson.com/products/search?q=fashion`)
        .then((response) => {
            if (!response.ok) {
                throw new Error
                    (`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            productsList = data.products;
            console.log(productsList);
            addDataToHTML();
        })

        .catch((error) =>
            console.error("Unable to fetch data:", error));
}


/* Cart */

let carts = [];
let listCart = document.querySelector('.cart-list');
let iconCartSpan = document.querySelector('.icon-cart-span');

function addItemToCart(event) {
    let product_id = event.target.parentElement.parentElement.parentElement.dataset.id;
    addToCart(product_id);
}

let addToCart = (product_id) => {
    let positionThisProductInTheCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInTheCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        ++carts[positionThisProductInTheCart].quantity;
    }
    console.log(carts)
    addCartToHTML();
}

listCart.addEventListener('click', (event) => {
    let positionClicked = event.target;
    if (positionClicked.classList.contains('cart-item-minus') || positionClicked.classList.contains('cart-item-plus')) {
        let product_id = positionClicked.parentElement.parentElement.dataset.id;
        positionClicked.classList.contains('cart-item-minus')
        let type = positionClicked.classList.contains('cart-item-minus') ? 'minus' : 'plus';
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionOfProductInTheCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionOfProductInTheCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionOfProductInTheCart].quantity++;
                break;

            case 'minus':
                let valueChange = carts[positionOfProductInTheCart].quantity - 1;
                carts[positionOfProductInTheCart].quantity = valueChange > 0 ? valueChange : carts.splice(positionOfProductInTheCart, 1);
                break;
        }
    }
    addCartToHTML();
}

let addCartToHTML = () => {
    listCart.innerHTML = '';
    let totalQuantity = 0;
    console.log(listCart)
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('cart-item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = productsList.findIndex((value) => value.id == cart.product_id);
            let info = productsList[positionProduct];
            newCart.innerHTML = `
            <div class="cart-item-image">
                    <img src="${info.images[0]}" alt="">
            </div>
            <div class="cart-item-name">
                ${info.title}
            </div>
            <div class="cart-item-total-price">
                ${(info.price * cart.quantity).toFixed(2)}
            </div>
            <div class="cart-item-quantity">
                <span class="cart-item-minus"><</span>
                <span>${cart.quantity}</span>
                <span class="cart-item-plus">></span>
            </div>
        `;
            listCart.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

window.onload = fetchHeroImages();
window.onload = fetchJSONData();
setTimeout(changeImage, 1000);
