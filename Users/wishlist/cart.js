const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}

const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
const accessToken = JSON.parse(localStorage.getItem("accessToken"));

const headers = {
  "Content-Type": "application/json",
  token: accessToken,
};

let wishListData = [];

document.addEventListener("DOMContentLoaded", () => {
  getWishlist();
});

// Fetch wishlist data
async function getWishlist() {
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });

    const data = await res.json();

    if (res.ok) {
      wishListData = data.data;
      renderWishlistTable(wishListData);
    } else {
      document.getElementById("wishlistContainer").innerHTML =
        `<p class="error">${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    document.getElementById("wishlistContainer").innerHTML =
      "<p class='error'>Failed to load wishlist.</p>";
  }
}

// Render wishlist in a table
function renderWishlistTable(data) {
  if (data.length === 0) {
    document.getElementById("wishlistContainer").innerHTML =
      "<p>Your wishlist is empty.</p>";
    return;
  }

  let tableHTML = `
    <table class="wishlist-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach((item) => {
    tableHTML += `
      <tr>
        <td><img src="${item.imageCover}" width="50" /></td>
        <td>${item.title}</td>
        <td>${item.price} $</td>
        <td>
          <button class="remove-btn" onclick="showConfirmModal('${item._id}', this)">Remove</button>
        </td>
      </tr>
    `;
  });

  tableHTML += "</tbody></table>";

  document.getElementById("wishlistContainer").innerHTML = tableHTML;
}

// Modal logic
let productIdToRemove = null;
let buttonToRemove = null;

function showConfirmModal(productId, button) {
  productIdToRemove = productId;
  buttonToRemove = button;
  document.getElementById("confirmModal").style.display = "flex";
}

document.getElementById("confirmYes").onclick = async function () {
  document.getElementById("confirmModal").style.display = "none";

  try {
    const response = await fetch(`${endpoint}/${productIdToRemove}`, {
      method: "DELETE",
      headers: headers,
    });

    const result = await response.json();

    if (response.ok && result.status === "success") {
      const row = buttonToRemove.closest("tr");
      row.remove();

      wishListData = wishListData.filter(item => item._id !== productIdToRemove);

      if (wishListData.length === 0) {
        document.getElementById("wishlistContainer").innerHTML =
          "<p>Your wishlist is now empty.</p>";
      }
    } else {
      alert(result.message || "Failed to remove item.");
    }
  } catch (error) {
    console.error("Error removing item:", error);
    alert("Network error. Try again.");
  }

  productIdToRemove = null;
  buttonToRemove = null;
};

document.getElementById("confirmNo").onclick = function () {
  document.getElementById("confirmModal").style.display = "none";
  productIdToRemove = null;
  buttonToRemove = null;
};


var numberOfCart = document.getElementById("numberOfCart");
var numOfCart = JSON.parse(localStorage.getItem("NumOfProd"));
// console.log(numberOfCart)
// console.log(numOfCart);

numberOfCart.innerText = numOfCart;
console.log(numberOfCart);


function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "../../Authentication/Login/login.html";
}