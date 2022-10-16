const formInputs = document.querySelectorAll(".floating-contact-form .form-container .form-input");

const contactIcon = document.querySelector(".floating-contact-form .contact-icon");

const formContainer = document.querySelector(".floating-contact-form .form-container");

contactIcon.addEventListener("click", () => {
    formContainer.classList.toggle("active");
  });