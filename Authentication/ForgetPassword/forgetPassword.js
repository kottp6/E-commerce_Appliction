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
    const form = document.getElementById("forgot-password-form");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const errorMessage = document.getElementById("error-message");
    const submitButton = document.getElementById("submit-btn");
    const emailIcon = document.getElementById("emailIcon");
    const successModal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    let emailTouched = false;

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function toggleButton() {
        const isValid = validateEmail(emailInput.value.trim());
        submitButton.disabled = !isValid;
    }

    emailInput.addEventListener("focus", () => {
        emailTouched = true;
    });

    emailInput.addEventListener("blur", () => {
        if (!emailTouched) return;

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            emailError.textContent = "Please enter a valid email.";
            emailIcon.className = "fa-solid fa-xmark icon invalid";
        } else {
            emailInput.classList.remove("invalid");
            emailInput.classList.add("valid");
            emailError.textContent = "";
            emailIcon.className = "fa-solid fa-check icon valid";
        }

        toggleButton();
    });

    emailInput.addEventListener("input", () => {
        toggleButton();
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        errorMessage.textContent = "";
        errorMessage.style.display = "none";

        if (!validateEmail(email)) {
            emailError.textContent = "Please enter a valid email.";
            emailInput.classList.add("invalid");
            emailIcon.className = "fa-solid fa-xmark icon invalid";
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.statusMsg === "success") {
                successModal.style.display = "flex";
                setTimeout(() => {
                    window.location.href = "../VerrifyCode/verifyCode.html";
                }, 2000);
            } else {
                throw new Error(data.errors?.email || "Something went wrong.");
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        } finally {
            submitButton.innerHTML = "Reset Password";
            toggleButton();
        }
    });

    closeModalBtn?.addEventListener("click", () => {
        successModal.style.display = "none";
        window.location.href = "../VerrifyCode/verifyCode.html";
    });
});
