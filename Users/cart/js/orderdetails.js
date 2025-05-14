const token =JSON.parse(localStorage.getItem("accessToken"));
if (!token) {
  window.location.href = "../../Authentication/Login/login.html";
}
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('orderTableBody');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');

  const cart = JSON.parse(localStorage.getItem('CartAll'));
  const cartId = JSON.parse(localStorage.getItem('cartID'));
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  const isApproved =JSON.parse(localStorage.getItem("orderApproved") === "true");

  if (!cart || !cart.products.length) {
    tableBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    confirmOrderBtn.disabled = true;
    return;
  }

  // Enable button only if admin approved
  confirmOrderBtn.disabled = !isApproved;

  // Render cart items
  cart.products.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.product.imageCover}" alt="${item.product.title}" width="50"></td>
      <td>${item.product.title}</td>
      <td>${item.count}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${(item.count * item.price).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  // Handle Confirm Order
  confirmOrderBtn.addEventListener('click', async () =>{
    window.location.href= '../shipping/shipping.html';
  })
})