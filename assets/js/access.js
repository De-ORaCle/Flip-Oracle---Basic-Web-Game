// SECURING THE LEVEL PAGES

// Retrieve the values from localStorage
const Username = localStorage.getItem("Username");
const Password = localStorage.getItem("Password");

// Check if either value is empty or undefined
if (!Username || Username === "undefined" || !Password || Password === "undefined") {
  // Redirect the user to an error page
  window.location.href = "../signin.html";
}
