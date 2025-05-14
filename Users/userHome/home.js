const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}

let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`

var p = JSON.parse(localStorage.getItem("allProducts"))
console.log(p);

let allProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let { data } = await response.json();
    allProducts = data;
    console.log(allProducts);

    displayProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}



//start searchProducts

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', async function () {
  const searchValue = this.value.trim().toLowerCase();
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    let products = data.data;

    if (searchValue === '') {
      displayProducts(products);
    } else {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue)
      );
      if (filteredProducts.length > 0) {
        displayProducts(filteredProducts);
      } else {
        productsContainer.innerHTML = "<p>No products found matching your search.</p>";
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    productsContainer.innerHTML = "<p>Error loading products. Please try again.</p>";
  }
});
//end searchProducts

const categorySelect = document.getElementById('categorySelect');
const productsContainer = document.getElementById('productsContainer');


fetch('https://ecommerce.routemisr.com/api/v1/categories')
  .then(res => res.json())
  .then(data => {
    categorySelect.innerHTML = '<option value="">Choose </option>';
    data.data.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat._id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  });

categorySelect.addEventListener('change', function () {
  const categoryId = this.value;
  if (categoryId === '') {
    productsContainer.innerHTML = '';
    return;
  }

  fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
    .then(res => res.json())
    .then(data => {
      productsContainer.innerHTML = '';

      data.data.forEach(product => {
        const productCard = `
           <div class="product">
            <i class="fa-regular fa-heart"></i>
              <div class="image">
                 <img src="${product.imageCover}" alt="${product.title}" width="100px" />
               </div>
              <div class="contentProd">
                <h3>${product.title}</h3>
                <h4>price:${product.price}$</h4>
              </div>
              <button addProductToCart="${product.id}" class="prodBtn">Add to Cart</button>
            </div>
        `;
        productsContainer.innerHTML += productCard;
      });
    })
    .catch(err => {
      console.error('error to upload products:', err);
    });
});

fetch('https://ecommerce.routemisr.com/api/v1/products')
  .then(res => res.json())
  .then(data => {
    displayProducts(data.data);
  })
  .catch(err => {
    console.error('error to upload products :', err);
  });

categorySelect.addEventListener('change', function () {
  const categoryId = this.value;
  if (categoryId === '') {
    productsContainer.innerHTML = '';
    return;
  }

  fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
    .then(res => res.json())
    .then(data => {
      displayProducts(data.data);
    })
    .catch(err => {
      console.error('error to upload products:', err);
    });
});

function displayProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = `
      <div class="product">
        <i onclick="addProductToWish('${product.id}', this)"  class="fa-regular fa-heart"></i>
        <div class="image">
          <img src="${product.imageCover}" alt="${product.title}" width="100px" />
        </div>
        <div class="contentProd">
          <h3>${product.title}</h3>
          <h4>Price: ${product.price}$</h4>
        </div>
        <button onclick="addProductToCart('${product.id}')" class="prodBtn">Add to Cart</button>
      </div>`;
    productsContainer.innerHTML += productCard;
  });
}
  
  function showMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "success-message";
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.classList.add("show");
    }, 100);
    setTimeout(() => {
      messageDiv.classList.remove("show");
      setTimeout(() => {
        messageDiv.remove();
      }, 500);
    }, 3000);
  }

// Replace with your actual token retrieval logic
var accessToken =JSON.parse(localStorage.getItem("accessToken")); // or get it from cookies, etc.
//console.log(accessToken);

let cartDetails = null;
let cartId = null;
let numOfCartItems = 0;
let userId = null;

const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;

// if (accessToken) {
//     getCart();
// }




async function addToCart(productId) {  
  if (!accessToken) {
      console.error("User not authenticated");
      alert("Please login first.");
      return;
  }

  try {
      var response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              token: accessToken
          },
          body: JSON.stringify({ productId })
      });

      var data = await response.json();

      if (response.ok) {
          console.log("Added to cart:", data);
          console.log(data.numOfCartItems);
          localStorage.setItem("NumOfProd", JSON.stringify(data.numOfCartItems));
          localStorage.setItem("ProductsOfCart", JSON.stringify(data.data));
          
          showCartModal();
      } else {
          console.error("Failed to add to cart:", data.message);
      }
  } catch (error) {
      console.error("Network or server error:", error);
  }
}



async function addProductToCart(productId) {
  var response = await addToCart(productId);

  if (response && response.status === "success") {
      showCartModal();
  } else {
      var message = response?.message;
     // alert(message);
  }
}


function showCartModal() {
  var modal = document.getElementById("cartModal");
  modal.style.display = "flex";

  var closeBtn = document.getElementById("closeCartModal");
  closeBtn.onclick = function () {
      modal.style.display = "none";
  };
}


var numberOfCart = document.getElementById("numberOfCart");
var numOfCart = JSON.parse(localStorage.getItem("NumOfProd"));

numberOfCart.innerText = numOfCart;
console.log(numberOfCart);




// WishList 
const endpointt = "https://ecommerce.routemisr.com/api/v1/wishlist";
const accessTokenn = JSON.parse(localStorage.getItem("accessToken"));

async function addToWishlist(productId) {
  const headers = {
    "Content-Type": "application/json",
    token: accessTokenn
  };

  try {
    const response = await fetch(endpointt, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }

    console.log("Wishlist response:", data);
    localStorage.setItem("WishlistData", JSON.stringify(data.data));
    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { status: "error", message: error.message };
  }
}

async function addProductToWish(productId, buttonElement) {
  const response = await addToWishlist(productId);

  if (response.status === "success") {
    if (buttonElement) {
      buttonElement.className = "fa-solid fa-heart";
    }
    showToast(response.message, "success");
  } else {
    showToast(response.message || "Something went wrong", "error");
  }
}

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../../Authentication/Login/login.html";
}