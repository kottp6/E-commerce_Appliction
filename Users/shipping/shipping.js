const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
let endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
let accessToken = JSON.parse(localStorage.getItem("accessToken"));

let headers = {
  "Content-Type": "application/json",
  token: accessToken,
};

//Call getCart on page load if token exists
document.addEventListener("DOMContentLoaded", function () {
  if (accessToken) {
    getCart();
  }
});

let cartId, userId, cartDetails, numOfCartItems;

async function getCart() {
  try {
    let response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });

    let data = await response.json();
    console.log("Cart:", data);
    localStorage.setItem("AllCart", JSON.stringify(data));

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

      return data;
    } else {
      throw new Error(data.message || "Failed to get cart");
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    return error;
  }
}


var x = JSON.parse(localStorage.getItem("AllCart"));
console.log("hello");

console.log(x.cartId);



  // Initialize states and variables
let isOnline = false;



let detailsInput = document.getElementById('details');
let phoneInput = document.getElementById('phone');
let cityInput = document.getElementById('city');
let isOnlineCheckbox = document.getElementById('isOnline');
let submitButton = document.getElementById('submitButton');
let errorMessageElement = document.getElementById('errorMessage');

// Handle form submission
let form = document.getElementById('checkoutForm');
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let formValues = {
        details: detailsInput.value,
        phone: phoneInput.value,
        city: cityInput.value
    };

    let validationError = validateForm(formValues);
    if (validationError) {
        errorMessageElement.textContent = validationError;
        return;
    }

    handleCheckout(formValues);
});

// Handle the change for online payment checkbox
isOnlineCheckbox.addEventListener('change', function () {
    isOnline = isOnlineCheckbox.checked;
});

// Basic form validation
function validateForm(formValues) {
    if (!formValues.details) {
        return "Name is Required";
    }
    if (!formValues.city) {
        return "City is Required";
    }
    let phoneRegex = /^(002)?01[0125][0-9]{8}$/;
    if (!formValues.phone || !phoneRegex.test(formValues.phone)) {
        return "Phone Number Must Contain 11 Digits";
    }
    return null;
}

// Handle checkout logic
async function handleCheckout(formValues) {
    console.log("Form submitted with values:", formValues);

    let url = isOnline
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://127.0.0.1:5500/Users/MyOrders`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    let response = await getPaymentCash(url, formValues);
    console.log("Respone" + response);
    
    if (response.status === "success") {
        console.log('data', response);
        if (isOnline) {
            window.location.href = response.session.url;
        } else {
            alert("Payment done successfully");
            setTimeout(() => {
                window.location.href = './MyOrders/allorders.html'; // Replace with actual route
            }, 3000);
        }
    } else {
        errorMessageElement.textContent = "Payment failed, please try again.";
    }
}

async function getPaymentCash(url, formValues) {
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));

  try {
      let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              token: accessToken, 
          },
          body: JSON.stringify(formValues),
      });

      let data = await response.json();
      return data;
  } catch (error) {
      console.error('Payment Error:', error);
      return { status: 'error', message: error.message };
  }
}


    
let userName = document.getElementById("userName");
let UN = JSON.parse(localStorage.getItem("Name"))
userName.innerHTML = `Welcome ${UN}`


function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../../Authentication/Login/login.html";
}

