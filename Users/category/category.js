const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`

async function displayCategories() {
      try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await response.json();

        const categories = data.data;
        const container = document.getElementById("category-container");

        container.innerHTML = ""; 

        categories.forEach(category => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <div class="card-body">
              <div class="card-title">${category.name}</div>
            </div>
          `;

          container.appendChild(card);
        });
      } catch (error) {
        console.error("Error loading categories:", error);
    }
}

displayCategories();


function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "../../Authentication/Login/login.html";
}


var numberOfCart = document.getElementById("numberOfCart");
var numOfCart = JSON.parse(localStorage.getItem("NumOfProd"));

numberOfCart.innerText = numOfCart;
console.log(numberOfCart);