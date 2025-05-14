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



// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("resetForm");
//     const emailInput = document.getElementById("email");
//     const passwordInput = document.getElementById("password");
  
//     const emailError = document.getElementById("emailError");
//     console.log(emailError);
    
//     const passwordError = document.getElementById("passwordError");
  
//     const emailIcon = document.getElementById("emailIcon");
//     const passwordIcon = document.getElementById("passwordIcon");
  
//     const submitButton = document.getElementById("submitButton");
  
//     let touched = {
//       email: false,
//       password: false,
//     };
  
//     function isValidEmail(email) {
//       const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return pattern.test(email);
//     }
  
//     function isValidPassword(password) {
//       return password.length >= 6;
//     }
  
//     function validateEmail() {
//       const email = emailInput.value.trim();
//       if (!isValidEmail(email)) {
//         emailInput.classList.add("invalid");
//         emailInput.classList.remove("valid");
//         emailError.innerText = "Invalid email format.";
//         console.log(emailError);
        
//         emailIcon.className = "fa-solid fa-xmark icon invalid";
//         return false;
//       } else {
//         emailInput.classList.remove("invalid");
//         emailInput.classList.add("valid");
//         emailError.textContent = "";
//         emailIcon.className = "fa-solid fa-check icon valid";
//         return true;
//       }
//     }
  
//     function validatePassword() {
//       const password = passwordInput.value.trim();
//       if (!isValidPassword(password)) {
//         passwordInput.classList.add("invalid");
//         passwordInput.classList.remove("valid");
//         passwordError.textContent = "Password must be at least 6 characters.";
//         passwordIcon.className = "fa-solid fa-xmark icon invalid";
//         return false;
//       } else {
//         passwordInput.classList.remove("invalid");
//         passwordInput.classList.add("valid");
//         passwordError.textContent = "";
//         passwordIcon.className = "fa-solid fa-check icon valid";
//         return true;
//       }
//     }
  
//     function checkFormValidity() {
//       const isFormValid = isValidEmail(emailInput.value.trim()) && isValidPassword(passwordInput.value.trim());
//       submitButton.disabled = !isFormValid;
//     }
  
//     emailInput.addEventListener("blur", () => {
//       touched.email = true;
//       if (touched.email) {
//         validateEmail();
//         checkFormValidity();
//       }
//     });
  
//     passwordInput.addEventListener("blur", () => {
//       touched.password = true;
//       if (touched.password) {
//         validatePassword();
//         checkFormValidity();
//       }
//     });
  
//     emailInput.addEventListener("input", () => {
//       if (touched.email) {
//         validateEmail();
//         checkFormValidity();
//       }
//     });
  
//     passwordInput.addEventListener("input", () => {
//       if (touched.password) {
//         validatePassword();
//         checkFormValidity();
//       }
//     });
  
//     form.addEventListener("submit", function (e) {
//       e.preventDefault();
  
//       touched.email = true;
//       touched.password = true;
  
//       const validEmail = validateEmail();
      
//       const validPassword = validatePassword();
  
//       if (validEmail && validPassword) {
//         alert("Password reset submitted successfully.");
//         form.reset();
  
//         // Reset visual and state
//         emailInput.classList.remove("valid", "invalid");
//         passwordInput.classList.remove("valid", "invalid");
//         emailIcon.className = "";
//         passwordIcon.className = "";
//         emailError.textContent = "";
//         passwordError.textContent = "";
//         submitButton.disabled = true;
//         touched.email = false;
//         touched.password = false;
//       }
//     });
//   });
  

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resetForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const emailIcon = document.getElementById("emailIcon");
  const passwordIcon = document.getElementById("passwordIcon");

  const submitButton = document.getElementById("submitButton");

  let touched = {
    email: false,
    password: false,
  };

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
      emailError.innerText = "Invalid email format.";
      emailIcon.className = "fa-solid fa-xmark icon invalid";
      return false;
    } else {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
      emailError.textContent = "";
      emailIcon.className = "fa-solid fa-check icon valid";
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    if (!isValidPassword(password)) {
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");
      passwordError.textContent = "Password must be at least 6 characters.";
      passwordIcon.className = "fa-solid fa-xmark icon invalid";
      return false;
    } else {
      passwordInput.classList.remove("invalid");
      passwordInput.classList.add("valid");
      passwordError.textContent = "";
      passwordIcon.className = "fa-solid fa-check icon valid";
      return true;
    }
  }

  function checkFormValidity() {
    const isFormValid =
      isValidEmail(emailInput.value.trim()) &&
      isValidPassword(passwordInput.value.trim());
    submitButton.disabled = !isFormValid;
  }

  emailInput.addEventListener("blur", () => {
    touched.email = true;
    if (touched.email) {
      validateEmail();
      checkFormValidity();
    }
  });

  passwordInput.addEventListener("blur", () => {
    touched.password = true;
    if (touched.password) {
      validatePassword();
      checkFormValidity();
    }
  });

  emailInput.addEventListener("input", () => {
    if (touched.email) {
      validateEmail();
      checkFormValidity();
    }
  });

  passwordInput.addEventListener("input", () => {
    if (touched.password) {
      validatePassword();
      checkFormValidity();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    touched.email = true;
    touched.password = true;

    const validEmail = validateEmail();
    const validPassword = validatePassword();

    if (validEmail && validPassword) {
      showSuccessModal();
    }
  });

  function showSuccessModal() {
    const modal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    modal.style.display = "flex";



    setTimeout(() => {
      window.location.href = "../Login/login.html"; // Redirect to the dashboard page
  }, 2000); // 2-second delay before redirect

  // Close the modal when the button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        window.location.href = "../Login/login.html"; // Redirect to dashboard when user clicks "OK"
    });
  }
});
