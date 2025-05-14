const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`



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

userId = JSON.parse(localStorage.getItem("UserID"));
// console.log(userId);

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
  userDetails = data[data.length-1].user
  localStorage.setItem("UserDetails",JSON.stringify(userDetails));
  console.log(userDetails);
  
  displayOrders()

  } catch (error) {
  console.log(error);

  } finally {

  }
  }

getMyOrders()



let userData =JSON.parse(localStorage.getItem("UserDetails"));
console.log(userData);

let nu =JSON.parse(localStorage.getItem("Name"));
let nameUser = document.getElementById("name");
nameUser.innerHTML =`Name : ${nu}`;

let eu =JSON.parse(localStorage.getItem("Email"));
let emailUser = document.getElementById("email");
emailUser.innerHTML =`Email : ${eu}`;


let phoneUser = document.getElementById("phone");
phoneUser.innerHTML =`Phone : ${userData.phone}`;

function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../../Authentication/Login/login.html";
}




var numberOfCart = document.getElementById("numberOfCart");
var numOfCart = JSON.parse(localStorage.getItem("NumOfProd"));

numberOfCart.innerText = numOfCart;
console.log(numberOfCart);
