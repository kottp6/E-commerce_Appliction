
const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
const endpoint = 'https://ecommerce.routemisr.com/api/v1/cart';
const accessToken = JSON.parse(localStorage.getItem('accessToken'));

const cartBody = document.getElementById('cart-body');
const loadingEl = document.getElementById('loading');
const totalValueEl = document.getElementById('total-value');
const deleteCartBtn = document.getElementById('deleteCartBtn');

let cartDetails = null;
let cartId = null;
let numOfCartItems = 0;
let userId = null;

async function getCart() {
  try {
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    });
    const data = await res.json();
    if (res.ok && data.status === 'success') {
      cartDetails = data.data;
      localStorage.setItem("CartAll", JSON.stringify(cartDetails));
      cartId = data.data._id;
      userId = data.data.cartOwner;
      numOfCartItems = data.numOfCartItems;
      return cartDetails;
    } else {
      throw new Error(data.message || "Error fetching cart");
    }
  } catch (err) {
    console.error("Error loading cart:", err);
    return null;
  }
}

async function updateItem(productId, count) {
  try {
    const res = await fetch(`${endpoint}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken
      },
      body: JSON.stringify({ count })
    });
    const data = await res.json();
    if (res.ok && data.status === 'success') {
      cartDetails = data.data;
      cartId = data.data._id;
      userId = data.data.cartOwner;
      numOfCartItems = data.numOfCartItems;
      return data;
    } else {
      throw new Error(data.message || 'Update failed');
    }
  } catch (error) {
    return error.message;
  }
}

async function updateProduct(productId, count, quantitySpan, priceSpan, unitPrice) {
  const response = await updateItem(productId, count);
  if (response && response.status === 'success') {
    showModal("✅ Product Updated Successfully");
    quantitySpan.textContent = count;
    priceSpan.textContent = (count * unitPrice).toFixed(2);
    updateTotalPrice(response.data);
  } else {
    showModal("❌ Something went wrong: " + response);
  }
}

function renderCart(cart) {
  cartBody.innerHTML = '';
  if (!cart.products || cart.products.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="6">No items in cart</td></tr>`;
    return;
  }

  cart.products.forEach(item => {
    const row = document.createElement('tr');
    row.setAttribute('data-product-id', item.product._id);

    const totalPrice = item.count * item.price;
    row.innerHTML = `
      <td><img src="${item.product.imageCover}" alt="${item.product.title}"></td>
      <td>${item.product.title}</td>
      <td>
        <button class="decrease">−</button>
        <span class="quantity">${item.count}</span>
        <button class="increase">+</button>
      </td>
      <td>${item.product.quantity}</td>
      <td><span class="price">${totalPrice.toFixed(2)}</span> EGP</td>
      <td><button class="delete-cart-btn" onclick="handleRemoveItem('${item.product._id}')">Remove</button></td>
    `;
    cartBody.appendChild(row);
  });
}

function updateTotalPrice(cart) {
  const total = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);
  totalValueEl.textContent = total.toFixed(2);
}

cartBody.addEventListener('click', (e) => {
  const isInc = e.target.classList.contains('increase');
  const isDec = e.target.classList.contains('decrease');
  if (!isInc && !isDec) return;

  const row = e.target.closest('tr');
  const productId = row.getAttribute('data-product-id');
  const quantitySpan = row.querySelector('.quantity');
  const priceSpan = row.querySelector('.price');

  let quantity = parseInt(quantitySpan.textContent);
  const total = parseFloat(priceSpan.textContent);
  const unitPrice = total / quantity;

  if (isInc) quantity++;
  else if (quantity > 1) quantity--;
  else return;

  updateProduct(productId, quantity, quantitySpan, priceSpan, unitPrice);
});

async function loadCart() {
  loadingEl.style.display = 'block';
  const cart = await getCart();
  if (cart) {
    renderCart(cart);
    updateTotalPrice(cart);
  } else {
    cartBody.innerHTML = `<tr><td colspan="4">Error loading cart.</td></tr>`;
  }
  loadingEl.style.display = 'none';
}

async function handleRemoveItem(productId) {
  showModal("Are you sure you want to remove this product?", async () => {
    try {
      const res = await fetch(`${endpoint}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken
        }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showModal('🗑️ Product removed successfully');
        renderCart(data.data);
        updateTotalPrice(data.data);
      } else {
        throw new Error(data.message || "Failed to remove item");
      }
    } catch (err) {
      showModal("❌ Error removing item: " + err.message);
    }
  }, true);
}

deleteCartBtn.addEventListener('click', () => {
  showModal("Are you sure you want to delete your entire cart?", async () => {
    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken
        }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showModal("🛒 Cart deleted successfully.");
        renderCart({ products: [] });
        updateTotalPrice({ products: [] });
      } else {
        throw new Error(data.message || "Failed to delete cart");
      }
    } catch (err) {
      showModal("❌ Error: " + err.message);
    }
  }, true);
});

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  const cartData = JSON.parse(localStorage.getItem("CartAll"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (!cartData || !cartData.products || cartData.products.length === 0) {
    showModal("Cart is empty or invalid!");
    return;
  }

  const newOrder = {
    id: Date.now(),
    user: cartData.cartOwner,
    cart: cartData.products,
    total: cartData.totalCartPrice,
    status: "pending",
    notifyUser: false
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  showModal("Order placed! Awaiting admin approval.");

  
});


function showModal(message, callback = null, showCancel = false) {
  const modal = document.getElementById('custom-modal');
  const modalMessage = document.getElementById('modal-message');
  const okBtn = document.getElementById('modal-ok');
  const cancelBtn = document.getElementById('modal-cancel');

  modalMessage.textContent = message;
  modal.classList.remove('hidden');
  cancelBtn.classList.toggle('hidden', !showCancel);

  const closeModal = () => {
    modal.classList.add('hidden');
    okBtn.replaceWith(okBtn.cloneNode(true));  // Remove previous event
    cancelBtn.replaceWith(cancelBtn.cloneNode(true));
  };

  okBtn.onclick = () => {
    if (callback) callback();
    closeModal();
  };

  cancelBtn.onclick = closeModal;
}


window.addEventListener('DOMContentLoaded', loadCart);


function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "../../Authentication/Login/login.html";
}