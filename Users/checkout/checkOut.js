const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}

let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`
document.addEventListener("DOMContentLoaded", function () {
  // استرجاع البيانات من localStorage
  let products = JSON.parse(localStorage.getItem("cart"));
  let subtotal = localStorage.getItem("subtotal"); // استرجاع الـ Subtotal من localStorage
  console.log(products);

  // التحقق إذا كانت البيانات موجودة
  if (products && Array.isArray(products)) {
    // الحصول على العنصر الذي سيحتوي على جميع المنتجات
    let productsContainer = document.querySelector(".productsContainer");

    // الحصول على العنصر الذي سيعرض الـ Subtotal
    let subtotalElement = document.querySelector(".detials p");

    // تكرار المنتجات وإضافتها للـ HTML
    products.forEach((product) => {
      // إنشاء div جديد لكل منتج
      let productDiv = document.createElement("div");
      productDiv.classList.add("productInfo");

      // إضافة المحتوى داخل div الخاص بالمنتج
      productDiv.innerHTML = `
      <div class="btns">
        <button class="plusBtn">+</button>
        <button class="minBtn">-</button>
      </div>
      <img src="${product.image}" alt="${product.title}" />
      <div class="titleAndqAndNum">
        <h3>${product.title}</h3>
        <p>Quantity</p>
        <p class="quantity">${product.quantity}</p>
      </div>
      <div class="price">
        <p class="productPrice">Price:${product.basePrice}</p>
        <hr>
        <p class="totalPrice">Total: ${product.basePrice * product.quantity}</p>
      </div>
      <button class="xBtn">X</button>
    `;

      // إضافة المنتج إلى الـ container
      productsContainer.appendChild(productDiv);

      // إضافة حدث لإزالة المنتج عند الضغط على X
      productDiv.querySelector(".xBtn").addEventListener("click", function () {
        removeProduct(productDiv, product);
      });

      // إضافة حدث لزيادة الكمية عند الضغط على "+"
      productDiv
        .querySelector(".plusBtn")
        .addEventListener("click", function () {
          updateQuantity(product, 1, productDiv);
        });

      // إضافة حدث لتقليل الكمية عند الضغط على "-"
      productDiv
        .querySelector(".minBtn")
        .addEventListener("click", function () {
          if (product.quantity > 1) {
            updateQuantity(product, -1, productDiv);
          }
        });
    });

    // إذا كان هناك قيمة للـ Subtotal في localStorage، عرضها
    if (subtotal) {
      subtotalElement.textContent = `${subtotal}$`;
    } else {
      updateSubtotal(products); // في حال لم يتم العثور على الـ Subtotal، نقوم بحسابه
    }
  }

  // وظيفة لإزالة المنتج عند الضغط على X
  function removeProduct(productDiv, product) {
    // إزالة المنتج من الـ DOM
    productDiv.remove();

    // إزالة المنتج من localStorage
    let products = JSON.parse(localStorage.getItem("cart"));
    const productIndex = products.findIndex((p) => p.id === product.id); // استخدام id لتحديد المنتج
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(products));
    }

    // تحديث الـ subtotal بعد إزالة المنتج
    updateSubtotal(products);
  }

  // وظيفة لتحديث الكمية والسعر في الواجهة و localStorage
  function updateQuantity(product, change, productDiv) {
    // تحديث الكمية
    product.quantity += change;

    // تحديث الكمية في الواجهة
    productDiv.querySelector(".quantity").textContent = product.quantity;

    // تحديث السعر الإجمالي في الواجهة
    let totalPrice = product.basePrice * product.quantity;
    productDiv.querySelector(
      ".totalPrice"
    ).textContent = `Total: ${totalPrice}`;

    // تحديث الكمية في localStorage
    let products = JSON.parse(localStorage.getItem("cart"));
    const productIndex = products.findIndex((p) => p.id === product.id); // استخدام id لتحديد المنتج
    if (productIndex !== -1) {
      // تحديث الكمية في الـ localStorage
      products[productIndex].quantity = product.quantity;
      localStorage.setItem("cart", JSON.stringify(products));
    }

    // تحديث الـ subtotal بعد تعديل الكمية
    updateSubtotal(products);
  }

  // وظيفة لحساب الـ subtotal لجميع المنتجات
  function updateSubtotal(products) {
    // جمع السعر الإجمالي لكل منتج
    let subtotal = products.reduce((total, product) => {
      return total + product.basePrice * product.quantity;
    }, 0);

    // عرض الـ subtotal في الواجهة
    let subtotalElement = document.querySelector(".detials p");
    subtotalElement.textContent = `${subtotal}$`;

    // تخزين الـ subtotal في localStorage
    localStorage.setItem("subtotal", subtotal);
  }
});


function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../../Authentication/Login/login.html";
}
