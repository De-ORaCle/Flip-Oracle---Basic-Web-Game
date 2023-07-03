// PASSWORD TOGGLE

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("flip-password");
    var toggleIcon = document.querySelector(".toggle-icon");

    if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.add("visible");
    } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("visible");
    }
}