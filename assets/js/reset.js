// Event listener for the Restart link
document.getElementById("restart-link").addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.setItem('prevScore', 0);
    localStorage.setItem('currLevel', 0);
    // Redirect to level1.html
    window.location.href = "level1.html";
    
});


