function loadOrders() {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const table = document.getElementById("ordersTable");
      table.innerHTML = "<tr><th>User</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>";

      orders.forEach((order, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.user}</td>
          <td>${order.cart.map(p => `${p.product.title} x${p.count}`).join(", ")}</td>
          <td>${order.total} EGP</td>
          <td>${order.status}</td>
          <td>
            ${order.status === "pending" ? `<button onclick="approveOrder(${order.id})">Approve</button>` : "—"}
          </td>
        `;
        table.appendChild(row);
    });
}


function approveOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const updatedOrders = orders.map(order => {
    if (order.id === orderId) {
      order.status = "approved";
      localStorage.setItem("orderApproved", "true"); // ✅ Key to enable confirm button
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(updatedOrders));
  alert("✅ Order approved!");
}

loadOrders();