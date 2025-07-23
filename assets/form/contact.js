/**  * Contact Form Handling  */
const formElement = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const loadingDots = submitBtn.querySelector(".loading-dots");
const sendIcon = submitBtn.querySelector(".send-icon");
const successIcon = submitBtn.querySelector(".success-icon");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form
  if (!formElement.checkValidity()) {
    formElement.classList.add("was-validated");
    return;
  }

  // Animate button briefly
  submitBtn.classList.add("btn-animating");
  setTimeout(() => submitBtn.classList.remove("btn-animating"), 300);

  // Show loading and disable button
  submitBtn.disabled = true;
  sendIcon.style.display = "none";
  successIcon.classList.add("d-none");
  loadingDots.classList.remove("d-none");
  btnText.textContent = "Sending";

  const form = new FormData(formElement);

  fetch(
    "https://script.google.com/macros/s/AKfycbxvxNsZEklrrwfK_Q440BiD6Wn7I00LFWjYsZWRiRXfIGEn79FMvw2VyBUBgDCF-Jn8/exec",
    {
      method: "POST",
      //  mode: 'no-cors',//local
      body: new URLSearchParams(form),
    }
  )
    .then((res) => res.text())
    .then((data) => {
      document.querySelector(".sent-message").style.display = "block";
      document.querySelector(".error-message").style.display = "none";
      formElement.reset();
      formElement.classList.remove("was-validated");

      // Show thank you with tick
      loadingDots.classList.add("d-none");
      successIcon.classList.remove("d-none");
      btnText.textContent = "Thank You!";
    })
    .catch((err) => {
      document.querySelector(".error-message").textContent =
        "Error sending message.";
      document.querySelector(".error-message").style.display = "block";
      document.querySelector(".sent-message").style.display = "none";
    })
    .finally(() => {
      setTimeout(() => {
        // Reset button state after 3 seconds
        btnText.textContent = "Send Message";
        sendIcon.style.display = "inline-block";
        successIcon.classList.add("d-none");
        loadingDots.classList.add("d-none");
        submitBtn.disabled = false;
      }, 3000);
    });
});
