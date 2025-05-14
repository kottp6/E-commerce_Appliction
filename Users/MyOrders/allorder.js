const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`



document.querySelector(".liCart").addEventListener("click", function () {
    cart.style.right = 0;
  });
  
document.addEventListener("DOMContentLoaded", function () {
    if (accessToken) {
      getCart();
    }
});

let endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
let accessToken = JSON.parse(localStorage.getItem("accessToken"));

let headers = {
  "Content-Type": "application/json",
  token: accessToken,
};

let cartId, userId, cartDetails, numOfCartItems;

async function getCart() {
try {
    let response = await fetch(endpoint, {
    method: "GET",
    headers: headers,
    });

    let data = await response.json();
    console.log("Cart:", data);

    if (data.status === "success") {
    console.log("Raw cart data:", data.data);

    numOfCartItems = data.numOfCartItems;
    cartDetails = data.data;
    cartId = data?.data?._id || "No ID found";
    console.log("cartId:", cartId);
    userId = data.data.cartOwner;
    console.log("UserId:", cartId);


    localStorage.setItem("CartID", JSON.stringify(cartId)); // removed the space
    console.log("Cart ID:", cartId);

    localStorage.setItem("UserID", JSON.stringify(userId)); // removed the space
    console.log("User ID:", userId);

    return data;
    } else {
    throw new Error(data.message || "Failed to get cart");
    }
} catch (error) {
    console.error("Error getting cart:", error);
    return error;
}

}


// console.log(userId);
userId = JSON.parse(localStorage.getItem("UserID"))
async function getMyOrders() {

    try {
    
    var response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,{
    method: 'GET',
    headers: {
        headers: headers,
    }
    });

    if (!response.ok) {
    throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    localStorage.setItem("MyOrder", JSON.stringify(data));
    console.log(data);
    displayOrders()

    } catch (error) {
    console.log(error);

    } finally {

    }
    }

getMyOrders()

// console.log(orders);

function displayOrders() {
    
    var orders =JSON.parse(localStorage.getItem("MyOrder"));
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; 
  
    if (!orders || orders.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No orders found</td></tr>";
      return;
    }
  
    orders.forEach((order, index) => {
      const tr = document.createElement("tr");
      const shipping = order.shippingAddress || {};
      const itemsHTML = order.cartItems.map(item => {
        return `
          <div style="margin-bottom: 10px;">
            <img src="${item.product.imageCover}" width="50" style="vertical-align:middle; margin-right: 10px;">
            <strong>${item.product.title}</strong> (x${item.count}) - ${item.price} EGP
          </div>
        `;
      }).join("");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.id || order._id}</td>
        <td>${order.totalOrderPrice} EGP</td>
        <td>${order.isPaid}</td>
        <td>${order.isDelivered}</td>
        <td>${order.paymentMethodType}</td>
        <td>${new Date(order.createdAt).toLocaleDateString()}</td>
        <td>
        <details>
          <summary style="cursor:pointer">View Products</summary>
          ${itemsHTML}
        </details>
        </td>
        <td>
        <strong>Name:</strong> ${shipping.details || "kottp"}<br>
        <strong>City:</strong> ${shipping.city || "beba"}<br>
        <strong>Phone:</strong> ${shipping.phone || "01288845234"}
      </td>
      `;
  
      tbody.appendChild(tr);
    });
  }
  



function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../../Authentication/Login/login.html"; 
}



var numberOfCart = document.getElementById("numberOfCart");
var numOfCart = JSON.parse(localStorage.getItem("NumOfProd"));
// console.log(numberOfCart)
// console.log(numOfCart);

numberOfCart.innerText = numOfCart;
console.log(numberOfCart);