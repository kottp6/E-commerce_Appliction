// let orders = [];
// let currentPage = 1;
// let itemsPerPage = 5; 
// async function getOrders()
// {
//     var res = await fetch('https://ecommerce.routemisr.com/api/v1/orders');
//     var data = await res.json();
//     orderCount = data.results;
//     orderData = data;
//     console.log(data);
    
//     console.log(orderCount);
//     displayOrders()
//     localStorage.setItem("ordersLength" ,JSON.stringify(orderCount))
//     localStorage.setItem("AllOrders" ,JSON.stringify(orderData))

    
// }

// getOrders()

// function displayOrders() {
    
//     var orders =JSON.parse(localStorage.getItem("AllOrders"));
//     const tbody = document.getElementById("tableBody");
//     tbody.innerHTML = ""; 
  
//     if (!orders || orders.length === 0) {
//       tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No orders found</td></tr>";
//       return;
//     }
  
//     orders.data.forEach((order, index) => {
//       const tr = document.createElement("tr");
//       const shipping = order.shippingAddress || {};
//       const itemsHTML = order.cartItems.map(item => {
//         return `
//           <div style="margin-bottom: 10px;">
//             <img src="${item.product.imageCover}" width="50" style="vertical-align:middle; margin-right: 10px;">
//             <strong>${item.product.title}</strong> (x${item.count}) - ${item.price} EGP
//           </div>
//         `;
//       }).join("");
//       tr.innerHTML = `
//         <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
//         <td>${order.id || order._id}</td>
//         <td>${order.totalOrderPrice} EGP</td>
//         <td>${order.isPaid}</td>
//         <td>${order.isDelivered}</td>
//         <td>${order.paymentMethodType}</td>
//         <td>${new Date(order.createdAt).toLocaleDateString()}</td>
//         <td>
//         <details>
//           <summary style="cursor:pointer">View Products</summary>
//           ${itemsHTML}
//         </details>
//         </td>
//         <td>
//         <strong>Name:</strong> ${shipping.details || "kottp"}<br>
//         <strong>City:</strong> ${shipping.city || "beba"}<br>
//         <strong>Phone:</strong> ${shipping.phone || "01288845234"}
//       </td>
//       `;
  
//       tbody.appendChild(tr);
//     });
//   }

//   function showCurrentPage() {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentOrders = orders.slice(startIndex, endIndex);
  
//     displayOrders(currentOrders);
//     updatePaginationControls();
//   }

//   function updatePaginationControls() {
//     const totalPages = Math.ceil(orders.length / itemsPerPage);
//     document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
  
//     document.getElementById("prevBtn").disabled = currentPage === 1;
//     document.getElementById("nextBtn").disabled = currentPage === totalPages;
//   }

//   document.getElementById("prevBtn").addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       showCurrentPage();
//     }
//   });

//   document.getElementById("nextBtn").addEventListener("click", () => {
//     const totalPages = Math.ceil(orders.length / itemsPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       showCurrentPage();
//     }
//   });


// let orders = [];
// let currentPage = 1;
// let itemsPerPage = 10;

// async function getOrders() {
//   var res = await fetch('https://ecommerce.routemisr.com/api/v1/orders');
//   var data = await res.json();

//   orders = data.data; // Store the actual array
//   console.log("All Orders:", orders);

//   localStorage.setItem("AllOrders", JSON.stringify(orders));

//   showCurrentPage(); // Now this will paginate
// }

// getOrders();

// function displayOrders(pagedOrders) {
//   const tbody = document.getElementById("tableBody");
//   tbody.innerHTML = "";

//   if (!pagedOrders || pagedOrders.length === 0) {
//     tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No orders found</td></tr>";
//     return;
//   }

//   pagedOrders.forEach((order, index) => {
//     const tr = document.createElement("tr");
//     const shipping = order.shippingAddress || {};
//     const itemsHTML = order.cartItems.map(item => {
//       return `
//         <div style="margin-bottom: 10px;">
//           <img src="${item.product.imageCover}" width="50" style="vertical-align:middle; margin-right: 10px;">
//           <strong>${item.product.title}</strong> (x${item.count}) - ${item.price} EGP
//         </div>
//       `;
//     }).join("");

//     tr.innerHTML = `
//       <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
//       <td>${order.id || order._id}</td>
//       <td>${order.totalOrderPrice} EGP</td>
//       <td>${order.isPaid}</td>
//       <td>${order.isDelivered}</td>
//       <td>${order.paymentMethodType}</td>
//       <td>${new Date(order.createdAt).toLocaleDateString()}</td>
//       <td>
//         <details>
//           <summary style="cursor:pointer">View Products</summary>
//           ${itemsHTML}
//         </details>
//       </td>
//       <td>
//         <strong>Name:</strong> ${shipping.details || "N/A"}<br>
//         <strong>City:</strong> ${shipping.city || "N/A"}<br>
//         <strong>Phone:</strong> ${shipping.phone || "N/A"}
//       </td>
//     `;

//     tbody.appendChild(tr);
//   });
// }

// function showCurrentPage() {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentOrders = orders.slice(startIndex, endIndex);

//   displayOrders(currentOrders);
//   updatePaginationControls();
// }

// function updatePaginationControls() {
//   const totalPages = Math.ceil(orders.length / itemsPerPage);
//   document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
//   document.getElementById("prevBtn").disabled = currentPage === 1;
//   document.getElementById("nextBtn").disabled = currentPage === totalPages;
// }

// document.getElementById("prevBtn").addEventListener("click", () => {
//   if (currentPage > 1) {
//     currentPage--;
//     showCurrentPage();
//   }
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//   const totalPages = Math.ceil(orders.length / itemsPerPage);
//   if (currentPage < totalPages) {
//     currentPage++;
//     showCurrentPage();
//   }
// });


let currentPage = 1;
const itemsPerPage = 40;

async function getOrders(page = 1) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders?page=${page}`);
    const data = await res.json();

    console.log("Orders Data:", data);

    displayOrders(data.data); // orders array
    updatePaginationControls(data.metadata);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
}

function displayOrders(orderList) {
    let loader = document.getElementById("loader");
  const tbody = document.getElementById("tableBody");
  loader.style.display = "block";

  setTimeout(()=>{
    tbody.innerHTML = "";

  if (!orderList || orderList.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No orders found</td></tr>";
    return;
  }

  orderList.forEach((order, index) => {
    const tr = document.createElement("tr");
    const shipping = order.shippingAddress || {};
    const itemsHTML = order.cartItems.map(item => `
      <div style="margin-bottom: 10px;">
        <img src="${item.product.imageCover}" width="50" style="vertical-align:middle; margin-right: 10px;">
        <strong>${item.product.title}</strong> (x${item.count}) - ${item.price} EGP
      </div>
    `).join("");

    tr.innerHTML = `
      <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>${order._id}</td>
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
        <strong>Name:</strong> ${shipping.details || "N/A"}<br>
        <strong>City:</strong> ${shipping.city || "N/A"}<br>
        <strong>Phone:</strong> ${shipping.phone || "N/A"}
      </td>
    `;

    tbody.appendChild(tr);
    loader.style.display = "none";
  });
  },3000)
  
}

function updatePaginationControls(meta) {
  document.getElementById("pageInfo").textContent = `Page ${meta.currentPage} of ${meta.numberOfPages}`;
  
  document.getElementById("prevBtn").disabled = meta.currentPage === 1;
  document.getElementById("nextBtn").disabled = meta.currentPage === meta.numberOfPages;
}

// Navigation buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getOrders(currentPage);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  getOrders(currentPage);
});

// Initial load
getOrders(currentPage);
