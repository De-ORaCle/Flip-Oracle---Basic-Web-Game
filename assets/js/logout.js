// LOGOUT FUNCTION

// Get the logout button element
var logoutButton = document.getElementsByClassName("logout-button")[0];

const headers_ = {
    'Authorization': 'Bearer pat9fDCE6KCncB10g.edd3e847a14cd147b8c97670fd6a97d6eebc5a545c020efecb684a69714ff111',
    'Content-Type': 'application/json'
};

const base_id = 'appbvUD6uDfs8545m';
const table_name = 'tblfbfFKPy0vHilSq';

// When the logout button is clicked...
logoutButton.addEventListener("click", function() {
    // Get the username and password from localStorage
    var username = localStorage.getItem('Username');
    var password = localStorage.getItem('Password');
    var score = localStorage.getItem('prevScore')
    var Highscore = localStorage.getItem('Highscore')
    var level = localStorage.getItem('currLevel')

    // Check if the username and password exist in the Airtable API
    axios.get(`https://api.airtable.com/v0/${base_id}/${table_name}`, {
        params: {
            filterByFormula: `AND({Username} = "${username}", {Password} = "${password}")`
        },
        headers: headers_
    })
    .then((resp) => {
        if (resp.data.records.length > 0) {
            // Update the fields
            var recordId = resp.data.records[0].id;
            var updateData = {
                fields: {
                    loginout: "1",
                    Score: score,
                    CurrLevel: level,
                    Highscore: Highscore
                }
            };
            axios.patch(`https://api.airtable.com/v0/${base_id}/${table_name}/${recordId}`, updateData, {
                headers: headers_
            })
            .then(() => {
                // Clear the values in localStorage
                localStorage.removeItem('Username');
                localStorage.removeItem('Password');
                localStorage.removeItem('prevScore');
                localStorage.removeItem('Highscore');
                localStorage.removeItem('currLevel');
                localStorage.removeItem('Loginout');
                // Redirect to the login page
                window.location.href = "../signin.html";
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred, please try again later.');
            });
        } else {
            alert("User not found. Please log in again.");
            // Redirect to the login page
            window.location.href = "../signin.html";
        }
    })
    .catch(function(error) {
        console.error(error);
        alert('An error occurred, please try again later.');
    });
});
