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
    const resetCodeInput = document.getElementById("resetCode");
    const resetCodeIcon = document.getElementById("emailIcon");
    const resetCodeError = document.getElementById("emailError");
    const errorMessage = document.getElementById("errorMessage");
    const submitBtn = document.getElementById("submitBtn");
    const successModal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    let touched = false;

    function validateCode(code) {
        return code && /^[0-9]{4,6}$/.test(code);
    }

    function toggleButton() {
        submitBtn.disabled = !validateCode(resetCodeInput.value.trim());
    }

    resetCodeInput.addEventListener("focus", () => {
        touched = true;
    });

    resetCodeInput.addEventListener("blur", () => {
        if (!touched) return;

        const code = resetCodeInput.value.trim();

        if (!validateCode(code)) {
            resetCodeInput.classList.add("invalid");
            resetCodeInput.classList.remove("valid");
            resetCodeError.textContent = "Code must be 4-6 digits.";
            resetCodeIcon.className = "fa-solid fa-xmark icon invalid";
        } else {
            resetCodeInput.classList.remove("invalid");
            resetCodeInput.classList.add("valid");
            resetCodeError.textContent = "";
            resetCodeIcon.className = "fa-solid fa-check icon valid";
        }

        toggleButton();
    });

    resetCodeInput.addEventListener("input", toggleButton);

    window.verifyResetCode = async function () {
        const code = resetCodeInput.value.trim();

        if (!validateCode(code)) {
            resetCodeError.textContent = "Code must be 4-6 digits.";
            resetCodeInput.classList.add("invalid");
            resetCodeIcon.className = "fa-solid fa-xmark icon invalid";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resetCode: code }),
            });

            const data = await response.json();

            if (data.status === "Success") {
                successModal.style.display = "flex";

                // Auto-redirect in 2 seconds
                setTimeout(() => {
                    window.location.href = "../NewPassword/newPassword.html";
                }, 2000);

                closeModalBtn.addEventListener("click", () => {
                    successModal.style.display = "none";
                    window.location.href = "../NewPassword/newPassword.html";
                });
            } else {
                throw new Error("Invalid or expired code.");
            }
        } catch (error) {
            errorMessage.textContent = error.message;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Verify Code";
        }
    };
});
