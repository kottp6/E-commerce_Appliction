const body = document.querySelector("body"),
nav = document.querySelector("nav"),
sidebarOpen = document.querySelector(".sidebarOpen"),
siderbarClose = document.querySelector(".siderbarClose");

var emailAdmin = document.getElementById("email");
var passAdmin = document.getElementById("password");


sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
    };

    const errors = validateLoginForm(formData);
    applyValidationStyles(errors);
    toggleSubmitButton(errors);
    
    if (Object.keys(errors).length === 0) {
        handleLogin(formData);
    }
});

document.getElementById("email").addEventListener("blur", handleInputChange);
document.getElementById("password").addEventListener("blur", handleInputChange);

function handleInputChange() {
    const formData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
    };
    const errors = validateLoginForm(formData);
    applyValidationStyles(errors);
    toggleSubmitButton(errors);
}

function validateLoginForm({ email, password }) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errors.email = "Invalid email format.";
    }
    if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
}

function applyValidationStyles(errors) {
    const fields = ['email', 'password'];
    let firstErrorShown = false;

    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorText = document.getElementById(field + 'Error');
        const icon = document.getElementById(field + 'Icon');

        if (focusedFields[field]) {
            if (errors[field]) {
                if (!firstErrorShown) {
                    input.classList.add('invalid');
                    input.classList.remove('valid');
                    errorText.textContent = errors[field];
                    errorText.classList.add('visible');
                    if (icon) icon.className = 'fa-solid fa-xmark icon invalid';
                    firstErrorShown = true;
                } else {
                   
                    input.classList.remove('invalid');
                    input.classList.remove('valid');
                    errorText.textContent = '';
                    errorText.classList.remove('visible');
                    if (icon) icon.className = 'fa icon';
                }
            } else {
                input.classList.remove('invalid');
                input.classList.add('valid');
                errorText.textContent = '';
                errorText.classList.remove('visible');
                if (icon) icon.className = 'fa-solid fa-check icon valid';
            }
        } else {
            input.classList.remove('invalid');
            input.classList.remove('valid');
            errorText.textContent = '';
            errorText.classList.remove('visible');
            if (icon) icon.className = 'fa icon';
        }
    });
}

function toggleSubmitButton(errors) {
    const submitBtn = document.getElementById("submitBtn");

    if (Object.keys(errors).length === 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

async function handleLogin(formValues) {
    const loginButton = document.getElementById("submitBtn");
    const errorMessage = document.getElementById("errorMessage");
    loginButton.disabled = true;
    errorMessage.textContent = "";

    const { email, password } = formValues;

    if (!email || !password) {
        errorMessage.textContent = "Email and password are required.";
        loginButton.disabled = false;
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email.";
        loginButton.disabled = false;
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        loginButton.disabled = false;
        return;
    }

    if(emailAdmin.value === "admin@gmail.com" && passAdmin.value === "123123")
    {
        setTimeout(() => {
            window.location.href = "/Admin/Dashboard/dashboard.html";
        }, 2000);
    }

    loginButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
    console.log("Submitting:", formValues);
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:  JSON.stringify(formValues),
        });
        const data = await response.json();
        console.log("Response Data:", data);
        if (data.message === "success") {
            localStorage.setItem("accessToken", JSON.stringify(data.token));
            localStorage.setItem("Name", JSON.stringify(data.user.name));
            localStorage.setItem("Email", JSON.stringify(data.user.email));
            showSuccessModal();
        } else {
            // errorMessage.textContent = data.message || "Login failed.";
        }
        } catch (error) {
            console.error("Login Error:", error);
            errorMessage.textContent = "An unexpected error occurred.";
        } finally {
            loginButton.disabled = false;
            loginButton.innerHTML = "Login";
        }

        
}

function showSuccessModal() {
    const modal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    modal.style.display = "flex";
    setTimeout(() => {
        window.location.href = "/Users/userHome/homeuser.html";
    }, 2000);
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        window.location.href = "/Users/userHome/homeuser.html";
    });
}


const inputs = ["email", "password"];
let focusedFields = {};

inputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("focus", () => {
        focusedFields[id] = true;
    });
    input.addEventListener("blur", () => {
        const formData = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
        };

        const errors = validateLoginForm(formData);
        applyValidationStyles(errors);
        toggleSubmitButton(errors);
    });
});
