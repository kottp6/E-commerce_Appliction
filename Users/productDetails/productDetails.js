let cart = document.querySelector(".cart");
document.getElementById("close").addEventListener("click", function () {
  cart.style.right = "-700px";
});
let product_list = document.querySelector(".productList");
let xBtn = document.querySelectorAll(".xBtn");
let clearBtn = document.querySelector(".clearBtn");
let productInfo = document.querySelector(".productInfo");
let divProductList = document.querySelector(".productList");
let countItems = document.querySelector(".countItems");
let Subtotal = document.querySelector(".Subtotal");
function removeProduct(e) {
  e.parentElement.remove();
  console.log("deleted");
}

document.querySelector(".liCart").addEventListener("click", function () {
  cart.style.right = 0;
});

document.addEventListener("DOMContentLoaded", async function () {
  const productId = localStorage.getItem("selectedProductId");

  if (!productId) {
    console.error(" No product ID found!");
    return;
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    const product = await response.json();

    document.querySelector(".content h2").innerText = product.data.title;
    document.querySelector(".content .des").innerText =
      product.data.description;
    document.querySelector(
      ".content .qun"
    ).innerText = ` Quantity : ${product.data.quantity}`;
    document.querySelector(
      ".content h4"
    ).innerText = `Price: ${product.data.price}$`;
    document.querySelector(".img img").src = product.data.imageCover;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
});

// cart

document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("prodBtn")) {
    const productElement = event.target.closest(".product");

    const productId = event.target.getAttribute("data-product-id");
    const productTitle =
      productElement.querySelector(".content h2").textContent;
    const basePrice = parseFloat(
      productElement.querySelector("h4").textContent.split(":")[1].trim()
    );
    const productImage = productElement.querySelector(".img img").src;

    const product = {
      id: productId,
      title: productTitle,
      basePrice: basePrice,
      price: basePrice,
      quantity: 1,
      image: productImage,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === productId);

    if (!existingProduct) {
      cart.push(product);
    } else {
      existingProduct.quantity += 1;
      existingProduct.price =
        existingProduct.basePrice * existingProduct.quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
    updateCartBadge();

    const alertMessage = document.querySelector(".added-item-alert");
    alertMessage.style.opacity = "1";
    alertMessage.style.transform = "translateY(0)";
    alertMessage.style.visibility = "visible";

    setTimeout(() => {
      alertMessage.style.opacity = "0";
      alertMessage.style.transform = "translateY(-101%)";
    }, 2000);
  }
});

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");

  cartItemsContainer.innerHTML = "";

  cart.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("productInfo");

    productElement.innerHTML = `
      <div class="btns">
        <button class="PlusBtn" data-product-id="${product.id}">+</button>
        <button class="minBtn" data-product-id="${product.id}">-</button>
      </div>
      <img src="${product.image}" alt="${product.title}" />
      <div class="titleAndqAndNum">
        <h3>${product.title}</h3>
        <p>Quantity</p>
        <p class="quantity">${product.quantity}</p>
      </div>
      <div class="price">
        <p>Price</p>
        <p>${(product.basePrice * product.quantity).toFixed(2)}$</p>
      </div>
      <button onclick="removeProduct(this)" class="xBtn">X</button>
    `;

    cartItemsContainer.appendChild(productElement);
  });

  updateSubtotal();
}

document.addEventListener("click", function (event) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (event.target && event.target.classList.contains("PlusBtn")) {
    const productId = event.target.getAttribute("data-product-id");
    const product = cart.find((item) => item.id === productId);

    if (product) {
      product.quantity += 1;
      product.price = product.basePrice * product.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }
  }

  if (event.target && event.target.classList.contains("minBtn")) {
    const productId = event.target.getAttribute("data-product-id");
    const product = cart.find((item) => item.id === productId);

    if (product && product.quantity > 1) {
      product.quantity -= 1;
      product.price = product.basePrice * product.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }
  }
});

function removeProduct(button) {
  const productElement = button.closest(".productInfo");
  const productId = productElement
    .querySelector(".PlusBtn")
    .getAttribute("data-product-id");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((product) => product.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));

  productElement.remove();
  updateSubtotal();
  updateCartCount();
  updateCartBadge();
}

function updateSubtotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = cart.reduce((sum, product) => sum + (product.price || 0), 0);

  subtotal = isNaN(subtotal) ? 0 : subtotal;

  const subtotalElement = document.querySelector(".Subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = subtotal.toFixed(2) + "$";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  updateCartCount();
  updateCartBadge();
});

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

  const countElement = document.querySelector(".countItems");
  if (countElement) {
    countElement.textContent = `(${totalItems} items)`;
  }
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

  const spanCart = document.querySelector(".spanCart");
  if (spanCart) {
    spanCart.textContent = totalItems;
  }
}

document.getElementById("clearBasket").addEventListener("click", function () {
  localStorage.removeItem("cart");
  document.getElementById("cartItems").innerHTML = "";
  updateSubtotal();
  updateCartCount();
  updateCartBadge();
});
