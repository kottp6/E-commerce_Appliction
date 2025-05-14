// get All Products From API using Fetch
var allProducts = [];
async function getProducts()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    var data = await res.json();
    allProducts = data.data;
    console.log("Orginal");
    console.log(allProducts);
    displayProducts()
    localStorage.setItem("Products" ,JSON.stringify( allProducts))
    
}

getProducts();

// display all Data in table
let storedProducts = [];
function splitDescription(text, wordLimit) {
    if (!text) return "";
    let words = text.split(" "); // Split text into an array of words
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
}
function displayProducts() {
    let loader = document.getElementById("loader");
    let cardContainer = document.getElementById("card__container");

    // Show loader and hide content
    loader.style.display = "block";
    cardContainer.style.display = "none";

    setTimeout(() => {
        storedProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
        cardContainer.innerHTML = "";

        if (storedProducts.length === 0) {
            cardContainer.innerHTML = "<p>No products available.</p>";
        } else {
            storedProducts.forEach((product, i) => {
                cardContainer.innerHTML += `
                <article class="card__article">
                    <img src="${product.imageCover}" alt="Product Image" class="card__img">
                    <div class="card__data">
                        <span class="card__description">${product.description}</span>
                        <h2 class="card__title">${product.title}</h2>
                        <h2 class="card__title">Price: ${product.price}$</h2>
                        <span class="card__description">Category: ${product.category.name}</span>
                        <span class="card__description">Quantity: ${product.quantity}</span>
                        <div class="btnsPro">
                            <button onclick="setFormUpdate(${i})" class="btnEdit but">Update</button>
                            <button onclick="viewProduct(${i})" class="btnView but">View</button>
                            <button onclick="viewDelete(${i})" class="btnDelete but">Delete</button>
                        </div>
                    </div>
                </article>
                `;
            });
        }

        // Hide loader and show content
        loader.style.display = "none";
        cardContainer.style.display = "grid";

    }, 1000); // Simulate a short delay for better UX
}

// Call the function on page load
window.onload = displayProducts;

// update
prodID = document.getElementById("product-id");
prodName = document.getElementById("product-name");
prodImg = document.getElementById("product-image");
prodPrice = document.getElementById("product-price");
prodQun = document.getElementById("product-quantity");
prodCat = document.getElementById("product-category");
prodDesc = document.getElementById("product-desc");




function viewDelete(index) {
    console.log(index);

    const modal = document.getElementById("productModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        console.error("Modal or modal content not found.");
        return;
    }

    let product = storedProducts[index]; // Make sure allProducts is available

    if (!product) {
        console.log("Product not found.");
        return;
    }

    modalContent.innerHTML = `
        <h2 style="text-align : center; color :red">Delete Product ?</h2>
        <h3> Are you Delete Product : ${product.title} with Product ID: ${product.id}</h3>
        <button style="width:30%" onclick="deleteData(${index})" id="delete" class="btnDelete but">Delete</button>

        <button style="background-color : green; width:30%" onclick="closeModal()">Close</button>
    `;

    modal.style.display = "flex"; // Show modal
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

//Validation For inputs Products
function validateProductData(id, title, imageCover, price, quantity, category, description, allProducts) {
    let errors = [];

    if (!id || !title || !imageCover || !price || !quantity || !category || !description) {
        errors.push("All fields are required.");
    }

    if (isNaN(price) || price <= 0) {
        errors.push("Price must be a positive number.");
    }

    if (isNaN(quantity) || quantity < 1) {
        errors.push("Quantity must be a whole number greater than 0.");
    }

    if (!imageCover.match(/\.(jpeg|jpg|png|gif)$/i)) {
        errors.push("Image must be a valid URL ending in .jpg, .jpeg, .png, or .gif.");
    }

    if (allProducts.some(product => product.id === id)) {
        errors.push("Product ID must be unique.");
    }

    return errors;
}

// add product

function addProduct(event) {
    event.preventDefault();

    // Get product data from the form
    let id = document.getElementById("productId").value.trim();
    let title = document.getElementById("productName").value.trim();
    let imageCover = document.getElementById("productImage").value.trim();
    let price = document.getElementById("productPrice").value.trim();
    let quantity = document.getElementById("productQuantity").value.trim();
    // let category = document.getElementById("productCategory").value.trim();
    const category = document.getElementById("product-category").value;
    let description = document.getElementById("productDesc").value.trim();

    // Retrieve existing products from localStorage
    let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Run validation
    let validationErrors = validateProductData(id, title, imageCover, price, quantity, category, description, allProducts);

    if (validationErrors.length > 0) {
        displayErrorMessages(validationErrors);
        return;
    }

    // Create new product object
    const newProduct = {
        id,
        title,
        imageCover,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: { name: category },
        description,
    };

    // Add new product
    allProducts.push(newProduct);

    // Save updated list to localStorage
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    // Show success message
    showSuccessMessage("Product added successfully!");

    // Refresh 
    displayProducts();

    // Clear form fields
    document.getElementById("addProductForm").reset();
}

function displayErrorMessages(errors) {
    let errorBox = document.getElementById("errorMessage");
    errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
    errorBox.style.display = "block";

    setTimeout(() => {
        errorBox.style.display = "none";
    }, 4000);
}

function showSuccessMessage(message) {
    let messageBox = document.getElementById("successMessage");
    messageBox.innerText = message;
    messageBox.style.display = "block";
    messageBox.style.opacity = "1";

    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 500);
    }, 3000);
}

// View Product by index when click to view btn
function viewProduct(index) {
    console.log(index);

    const modal = document.getElementById("productModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        console.error("Modal or modal content not found.");
        return;
    }

    let product = storedProducts[index]; // Make sure allProducts is available

    if (!product) {
        console.log("Product not found.");
        return;
    }

    modalContent.innerHTML = `
        <h2>${product.title}</h2>
        <p>ID: ${product.id}</p>
        <img src="${product.imageCover}" alt="${product.title}" width="200">
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Category:</strong> ${product.category.name}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <button onclick="closeModal()">Close</button>
    `;

    modal.style.display = "flex"; // Show modal
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}



// when click to update btn in table move to UpdatePage using index
function setFormUpdate(index) {
    let product = storedProducts[index];
    console.log(product);
    
    if (!product) {
        console.log("Product not found.");
        return;
    }
    
    // Store the index and product data in localStorage to use on the update page
    localStorage.setItem("updateIndex", index);
    localStorage.setItem("updateProduct", JSON.stringify(product));
    
    // Redirect to update page
    window.location.href = `updateProduct.html?index=${index}`;
}


//Update Data

function updateData(event) {
    event.preventDefault();

    let index = localStorage.getItem("updateIndex");
    index = parseInt(index);

    if (isNaN(index) || index < 0) {
        console.log("Invalid product index.");
        return;
    }

    let storedProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    if (index >= storedProducts.length) {
        console.log("Product not found.");
        return;
    }

    let updatedProduct = {
        id: document.getElementById("product-id").value.trim(),
        title: document.getElementById("product-name").value.trim(),
        imageCover: document.getElementById("product-image").value.trim(),
        price: document.getElementById("product-price").value.trim(),
        quantity: document.getElementById("product-quantity").value.trim(),
        category: { name: document.getElementById("product-category").value.trim() },
        description: document.getElementById("product-desc").value.trim(),
    };

    // Run validation
    let validationErrors = validateProductData(
        updatedProduct.id,
        updatedProduct.title,
        updatedProduct.imageCover,
        updatedProduct.price,
        updatedProduct.quantity,
        updatedProduct.category.name,
        updatedProduct.description,
        storedProducts,
        index
    );

    if (validationErrors.length > 0) {
        displayErrorMessages(validationErrors);
        return;
    }

    // Save the updated product to localStorage
    localStorage.setItem(`updatedProduct_${updatedProduct.id}`, JSON.stringify(updatedProduct));
    storedProducts[index] = updatedProduct;
    localStorage.setItem("allProducts", JSON.stringify(storedProducts));

    console.log("Updated Product:", storedProducts[index]);

    // Show success message
    showSuccessMessage("Product updated successfully!");

    // Refresh product list
    displayProducts();

    // Redirect after 1.5 seconds
    setTimeout(() => {
        window.location.href = "products.html";
    }, 1500);
}

function displayErrorMessages(errors) {
    let errorBox = document.getElementById("errorMessage");
    errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
    errorBox.style.display = "block";

    setTimeout(() => {
        errorBox.style.display = "none";
    }, 4000);
}

function showSuccessMessage(message) {
    let messageBox = document.getElementById("successMessage");
    messageBox.innerText = message;
    messageBox.style.display = "block";
    messageBox.style.opacity = "1";

    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 500);
    }, 3000);
}

//fill input when update in updatePage
window.onload = function() {
    fetchCategories();
    let index = parseInt(localStorage.getItem("updateIndex"));
    let product = JSON.parse(localStorage.getItem("updateProduct"));
    //console.log(product);
    
    if (product && !isNaN(index) && index >= 0) {
        document.getElementById("product-id").value = product?.id;
        document.getElementById("product-name").value = product.title;
        document.getElementById("product-image").value = product.imageCover;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-quantity").value = product.quantity;
        // document.getElementById("product-category").value = product.category.name;
        document.getElementById("product-desc").value = product.description;
    }
    setTimeout(() => {
            document.getElementById("product-category").value = product.category.name;
    }, 300);
};



// delete Item
let i = 0;

function deleteData(deleteIndex) {
    if (!storedProducts || storedProducts.length === 0) {
        console.log("No products to delete.");
        return;
    }

    if (deleteIndex < 0 || deleteIndex >= storedProducts.length) {
        console.log("Invalid delete index.");
        return;
    }
    // Remove the selected item from the array
    var deleteItems = storedProducts.splice(deleteIndex, 1);
    console.log("Deleted Item:", deleteItems);

    // Store deleted item in localStorage with a unique key
    localStorage.setItem(`Delete Item ${i}`, JSON.stringify(deleteItems[0])); 
    i++; // Increment counter for next delete
    localStorage.setItem("allProducts", JSON.stringify(storedProducts));

    closeModal()
    displayProducts(); // Refresh the UI
    console.log("Updated Products:", storedProducts);
}

// Function to get all deleted items from localStorage
function getAllDeletedItems() {
    let deletedItems = [];
    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index);
        if (key.startsWith("Delete Item")) {
            deletedItems.push(JSON.parse(localStorage.getItem(key))); // Store as an array
        }
    }
    return deletedItems;
}

// Event listener to update and log deleted items whenever localStorage changes
window.addEventListener("storage", function () {
    let deletedItems = getAllDeletedItems();
    console.log("All Deleted Items:", deletedItems);
});



// Delete an item and store it in localStorage
deleteData(1);

// Get all deleted items as an array
let itm = getAllDeletedItems();
console.log("itm contains:", itm);


//clear inputs

function clearDate(){
    proID.value= "";
    proCat.value= "";
    proImg.value= "";
    proPri.value= "";
    proNam.value= "";
    proDes.value= "";
    Stock.value= "";
}


//search for products using title of product

function searchProduct(term){
    var cartoona=``
    var found = false;
    for(var i=0; i<storedProducts.length;i++)
    {
        if(storedProducts[i].title.toLowerCase().includes(term.toLowerCase())==true){
        found = true;
        cartoona +=
            `
            <article class="card__article">
                  <img src="${storedProducts[i].imageCover}"" alt="image" class="card__img">
    
                  <div class="card__data">
                     <span class="card__description"> ${splitDescription(storedProducts[i].description, 10)}</span>
                     <h2 class="card__title">${storedProducts[i].title}</h2>
                     <h2 class="card__title">Price : ${storedProducts[i].price}$</h2>
                     <span class="card__description">Category : ${storedProducts[i].category.name}$</span>
                     <span class="card__description">Quantity : ${storedProducts[i].quantity}$</span>
                    <div class="btnsPro">
                        <button onclick="setFormUpdate(${i})" id="update" class="btnEdit but">Update</button> 
                        <button onclick="viewProduct(${i})" id="view" class="btnView but">View</button>
                       
                        <button onclick="viewDelete(${i})" id="delete" class="btnDelete but">Delete</button>

                    </div>
                    
                  </div>
               </article>
            `
        }
    }
    if (!found) {
        cartoona = `<p style="text-align: center; color: red; font-size: 1.2rem;">No Products found.</p>`;
    }
    document.getElementById("card__container").innerHTML = cartoona;

}


async function fetchCategories() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const result = await response.json();
        const categories = result.data;

        const categorySelect = document.getElementById("product-category");
        categorySelect.innerHTML = `<option value="">Select a Category</option>`; // Reset

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.name;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Failed to load categories:", error);
    }
}





