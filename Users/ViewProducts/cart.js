



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

document.querySelector(".liCart").addEventListener("click", function () {
  cart.style.right = 0;
});
