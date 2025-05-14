userLen = document.getElementById("userLength");
proLen = document.getElementById("proLength");
catLen = document.getElementById("catLength");
orderLen = document.getElementById("orderLength");

console.log(userLen);

var users = [];
var allUser = [];
async function getUsers()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/users');
    var data = await res.json();
    users = data.totalUsers;
    allUser = data.users;
    console.log(users);
    console.log(allUser);
    displayUsers()
    localStorage.setItem("usersLength" ,JSON.stringify(users));
    localStorage.setItem("Allusers" ,JSON.stringify(allUser))

    
}

var allProducts = [];
async function getProducts()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    var data = await res.json();
    allProducts = data.results;
    console.log(allProducts);
    localStorage.setItem("ProductLength" ,JSON.stringify( allProducts))
    
}

// get All Products From API using Fetch
var allCategories = [];
async function getCategories()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    var data = await res.json();
    allCategories = data.results;
    console.log(allCategories);
    localStorage.setItem("CategoryLength" ,JSON.stringify( allCategories))
    
}

let orders = [];
async function getOrders()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/orders');
    var data = await res.json();
    orders = data.results;
    console.log(orders);
    localStorage.setItem("ordersLength" ,JSON.stringify(orders))
    
}


getUsers();
getProducts();
getCategories();
getOrders();
var numberOfUsers =JSON.parse(localStorage.getItem("usersLength"));
userLen.innerHTML = `<span>All User : ${numberOfUsers}</span>`

var numberOfProducts =JSON.parse(localStorage.getItem("ProductLength"));
proLen.innerHTML = `<span>All Products : ${numberOfProducts}</span>`

var numberOfCateories =JSON.parse(localStorage.getItem("CategoryLength"));
catLen.innerHTML = `<span>All Categories : ${numberOfCateories}</span>`


var numberOfOrders =JSON.parse(localStorage.getItem("ordersLength"));
orderLen.innerHTML = `<span>All Orders : ${numberOfOrders}</span>`;


// Function to Display Users in Table
function displayUsers() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = ""; // Clear previous data

    if (allUser.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="color:red;">No Users Found</td></tr>`;
        return;
    }

    allUser.forEach((user, index) => {
        let row = `
            <tr>
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.createdAt}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
window.onload = displayUsers;


function searchUser(term){
    var cartoona=``
    var found = false;
    for(var i=0; i<allUser.length;i++)
    {
        if(allUser[i].name.toLowerCase().includes(term.toLowerCase())==true){
        found = true;
        cartoona +=
            `
                <tr>
                    <td>${allUser[i]._id}</td>
                    <td>${allUser[i].name}</td>
                    <td>${allUser[i].email}</td>
                    <td>${allUser[i].createdAt}</td>
                </tr>
               
            `
        }
    }
    if (!found) {
        cartoona = `<p style="text-align: center; color: red; font-size: 1.2rem;">No Products found.</p>`;
    }
    document.getElementById("userTableBody").innerHTML = cartoona;

}
