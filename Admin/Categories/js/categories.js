// get All Products From API using Fetch
var allCategories = [];
async function getCategories()
{
    var res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    var data = await res.json();
    allCategories = data.data;
    console.log("Orginal");
    console.log(allCategories);
    displayCategories()
    localStorage.setItem("Categories" ,JSON.stringify( allCategories))
    
}

getCategories();

// display all Data Category in table
let storedCategories = [];
function displayCategories() {
    let loader = document.getElementById("loader");
    let container = document.getElementById("card__container");

    // Show loader and hide content
    loader.style.display = "block";
    container.style.display = "none";

    // Simulate loading delay
    setTimeout(() => {
        // Retrieve categories from localStorage
        storedCategories = JSON.parse(localStorage.getItem("allCategories")) || [];

        // Clear existing content in the container
        container.innerHTML = "";

        if (storedCategories.length === 0) {
            container.innerHTML = "<p style='text-align: center; color: red; font-size: 1.2rem;'>No Categories Found.</p>";
        } else {
            // Create a variable to hold HTML content
            let cartoona = "";

            // Loop through categories and build HTML for each one
            storedCategories.forEach((category, i) => {
                cartoona += `
                <article class="card__article">
                    <img src="${category.image}" alt="${category.name}" class="card__img">
                    <div class="card__data">
                        <h2 class="card__title">${category.name}</h2>
                        <h2 class="card__title">Slug: ${category.slug}</h2>
                        <div class="btnsPro">
                            <button onclick="setFormUpdate(${i})" class="btnEdit but">Update</button>
                            <button onclick="viewCategory(${i})" class="btnView but">View</button>
                            <button onclick="viewDelete(${i})" class="btnDelete but">Delete</button>
                        </div>
                    </div>
                </article>
                `;
            });

            // Add all category content to container at once
            container.innerHTML = cartoona;
        }

        // Hide loader and show content
        loader.style.display = "none";
        container.style.display = "grid";
    }, 1000); // Simulate a short delay for better UX
}


// Call the function on page load
window.onload = displayCategories;




//search for products using title of product
function searchCategory(term) {
    var cartoona = "";
    var found = false;

    for (var i = 0; i < storedCategories.length; i++) {
        if (storedCategories[i].name.toLowerCase().includes(term.toLowerCase())) {
            found = true;
            cartoona += `
                <article class="card__article">
                    <img src="${storedCategories[i].image}" alt="${storedCategories[i].name}" class="card__img">
                    <div class="card__data">
                        <h2 class="card__title">${storedCategories[i].name}</h2>
                        <h2 class="card__title">Slug: ${storedCategories[i].slug}</h2>
                        <div class="btnsPro">
                            <button onclick="setFormUpdate(${i})" class="btnEdit but">Update</button>
                            <button onclick="viewCategory(${i})" class="btnView but">View</button>
                            <button onclick="viewDelete(${i})" class="btnDelete but">Delete</button>
                        </div>
                    </div>
                </article>
            `;
        }
    }

    if (!found) {
        cartoona = `<p style="text-align: center; color: red; font-size: 1.2rem;">No categories found.</p>`;
    }

    document.getElementById("card__container").innerHTML = cartoona;
}



function viewCategory(index) {
    console.log(index);

    const modal = document.getElementById("categoryModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        console.error("Modal or modal content not found.");
        return;
    }

    let category = storedCategories[index]; // Make sure allProducts is available

    if (!category) {
        console.log("Category not found.");
        return;
    }

    modalContent.innerHTML = `
        <h2>${category.name}</h2>
        <p>ID: ${category._id}</p>
        <img src="${category.image}" alt="${category.name}" width="200">
        <p><strong>Slug:</strong> $${category.slug}</p>
       
        <button onclick="closeModal()">Close</button>
    `;

    modal.style.display = "flex"; // Show modal
}

function viewDelete(index) {
    console.log(index);

    const modal = document.getElementById("categoryModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        console.error("Modal or modal content not found.");
        return;
    }

    let category = storedCategories[index]; // Make sure allProducts is available

    if (!category) {
        console.log("Product not found.");
        return;
    }

    modalContent.innerHTML = `
        <h2 style="text-align : center; color :red">Delete Category ?</h2>
        <h3> Are you Delete Category : ${category.name} with Category ID: ${category._id}</h3>
        <button style="width:30%" onclick="deleteData(${index})" id="delete" class="btnDelete but">Delete</button>

        <button style="background-color : green; width:30%" onclick="closeModal()">Close</button>
    `;

    modal.style.display = "flex"; // Show modal
}

function closeModal() {
    document.getElementById("categoryModal").style.display = "none";
}

function validateCategoryData(id, name, image, slug, allCategories) {
    let errors = [];

    // Ensure all required fields are provided
    if (!id || !name || !slug || !image) {
        errors.push("All fields are required.");
    }

    // Check if the category ID already exists (using .some())
    if (allCategories && allCategories.some(category => category._id === id)) {
        errors.push("Category ID already exists.");
    }

    return errors;
}

function addCategory(event) {
    event.preventDefault();

    // Get category data from the form
    let id = document.getElementById("categoryId").value.trim();
    let name = document.getElementById("categoryName").value.trim();
    let slug = document.getElementById("categorySlug").value.trim();
    let image = document.getElementById("categoryImage").value.trim();

    // Retrieve stored categories from localStorage
    let storedCategories = JSON.parse(localStorage.getItem("Categories")) || [];

    // Validation: Ensure all fields are filled
    let validationErrors = validateCategoryData(id, name, image, slug, storedCategories);

    if (validationErrors.length > 0) {
        displayErrorMessages(validationErrors);
        return;
    }

    // Create a new category object
    const newCategory = {
        _id: id,
        name,
        slug,
        image
    };

    // Add the new category to the storedCategories array
    storedCategories.push(newCategory);

    // Save the updated categories array back to localStorage
    localStorage.setItem("allCategories", JSON.stringify(storedCategories));

    // Show success message
    showSuccessMessage("Category added successfully!");

    // Refresh category list
    displayCategories();
    
    // Clear the form fields
    document.getElementById("addCategoryForm").reset();
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
    messageBox.style.marginTop="10px"

    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 500);
    }, 3000);
}


function setFormUpdate(index) {
    let category = storedCategories[index];
    console.log(category);
    
    if (!category) {
        console.log("Category not found.");
        return;
    }
    
    // Store the index and category data in localStorage
    localStorage.setItem("updateIndex", index);
    localStorage.setItem("updateCategory", JSON.stringify(category));
    
    // Redirect to the update category page
    window.location.href = `updateCategory.html?index=${index}`;
}

window.onload = function() {
    let index = parseInt(localStorage.getItem("updateIndex"));
    let category = JSON.parse(localStorage.getItem("updateCategory"));

    if (category && !isNaN(index) && index >= 0) {
        document.getElementById("category-id").value = category._id;
        document.getElementById("category-name").value = category.name;
        document.getElementById("category-slug").value = category.slug;
        document.getElementById("category-image").value = category.image;
    }
};


function updateData(event) {
    event.preventDefault();

    // Retrieve the update index from localStorage and convert it to a number
    let index = parseInt(localStorage.getItem("updateIndex"), 10);

    // Retrieve the latest stored categories from localStorage
    let storedCategories = JSON.parse(localStorage.getItem("Categories")) || [];

    // Validate index
    if (isNaN(index) || index < 0 || index >= storedCategories.length) {
        console.log("Invalid category index.");
        return;
    }

    // Get updated category details from the form
    let updatedCategory = {
        _id: document.getElementById("category-id").value.trim(),
        name: document.getElementById("category-name").value.trim(),
        slug: document.getElementById("category-slug").value.trim(),
        image: document.getElementById("category-image").value.trim()
    };

    // Update the category in the array
    storedCategories[index] = updatedCategory;

    // Save the updated categories array back to localStorage
    localStorage.setItem("allCategories", JSON.stringify(storedCategories));

    console.log("Updated Category:", storedCategories[index]);

    // Redirect back to the categories list page
    window.location.href = "categories.html";
}


let i = 0;  // Counter to manage deleted category keys

// Function to delete category
function deleteData(deleteIndex) {
    if (!storedCategories || storedCategories.length === 0) {
        console.log("No Category to delete.");
        return;
    }

    // Ensure valid deleteIndex
    if (deleteIndex < 0 || deleteIndex >= storedCategories.length) {
        console.log("Invalid delete index.");
        return;
    }

    // Remove the selected item from the array
    let deletedItems = storedCategories.splice(deleteIndex, 1);
    console.log("Deleted Category:", deletedItems);

    // Store deleted item in localStorage with a unique key
    localStorage.setItem(`Delete Category ${i}`, JSON.stringify(deletedItems[0])); 
    i++;  // Increment counter for next delete

    // Update localStorage with the new allCategories after deletion
    localStorage.setItem("allCategories", JSON.stringify(storedCategories));
    closeModal();
    displayCategories(); // Refresh the UI
    console.log("Updated Categories:", storedCategories);
}

// Function to get all deleted items from localStorage
function getAllDeletedItems() {
    let deletedItems = [];
    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index);
        if (key.startsWith("Delete Category")) {  // Match correct key pattern
            deletedItems.push(JSON.parse(localStorage.getItem(key))); // Store as an array
        }
    }
    return deletedItems;
}

// Initial display of categories
displayCategories();
