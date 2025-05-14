const body = document.querySelector("body"),
nav = document.querySelector("nav"),
sidebarOpen = document.querySelector(".sidebarOpen"),
siderbarClose = document.querySelector(".siderbarClose");

sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const errorMessage = document.getElementById("error-message");
    const submitBtn = document.getElementById("submitBtn");

    const fields = ["name", "email", "phone", "password", "rePassword"];

    fields.forEach((field) => {
        const input = document.getElementById(field);
        input.addEventListener("blur", () => {
            const formValues = getFormValues();
            const fieldErrors = validateFields(formValues);
            showFieldError(field, fieldErrors[field]);
        });

        input.addEventListener("input", () => {
            const formValues = getFormValues();
            const fieldErrors = validateFields(formValues);
            showFieldError(field, fieldErrors[field]);
        });
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        errorMessage.textContent = "";

        const formValues = getFormValues();
        const errors = validateFields(formValues);
        const hasErrors = Object.keys(errors).length > 0;

        fields.forEach((field) => {
            showFieldError(field, errors[field]);
        });

        if (hasErrors) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Registering...`;

        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();

            if (response.ok && data.message === "success") {
                window.location.href = "/Authentication/Login/login.html";
            } else {
                errorMessage.textContent = data.message || "Registration failed.";
            }
        } catch (err) {
            console.error(err);
            errorMessage.textContent = "An error occurred during registration.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Register";
        }
    });

    function getFormValues() {
        return {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            password: document.getElementById("password").value.trim(),
            rePassword: document.getElementById("rePassword").value.trim(),
        };
    }

    function validateFields(values) {
        const errors = {};
        if (!values.name || values.name.length < 3 || values.name.length > 20) {
            errors.name = "Name must be between 3 and 20 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email address.";
        }

        const phoneRegex = /^(002)?01[0125][0-9]{8}$/;
        if (!phoneRegex.test(values.phone)) {
            errors.phone = "Phone must be a valid Egyptian number.";
        }

        const passwordRegex = /^[A-Z][a-z0-9_]{2,8}$/;
        if (!passwordRegex.test(values.password)) {
            errors.password = "Password must start with capital and be 3-9 chars.";
        }

        if (!values.rePassword) {
            errors.rePassword = "Please confirm your password.";
        } else if (values.password !== values.rePassword) {
            errors.rePassword = "Passwords do not match.";
        }

        return errors;
    }

    function showFieldError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        const icon = document.getElementById(`${field}Icon`);

        if (message) {
            errorElement.textContent = message;
            input.classList.add("invalid");
            input.classList.remove("valid");
            if (icon) icon.className = "fa-solid fa-xmark icon invalid";
        } else {
            errorElement.textContent = "";
            input.classList.remove("invalid");
            input.classList.add("valid");
            if (icon) icon.className = "fa-solid fa-check icon valid";
        }
    }
});
