// SIGN IN AUTHENTICATION

var thisForm = document.getElementById("signin-form");
const headers_ = {
    'Authorization': 'Bearer pat9fDCE6KCncB10g.edd3e847a14cd147b8c97670fd6a97d6eebc5a545c020efecb684a69714ff111',
    'Content-Type': 'application/json'
};

const base_id = 'appbvUD6uDfs8545m';
const table_name = 'tblfbfFKPy0vHilSq';

// When the form is submitted...
thisForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the form from submitting

    // Get the username and password values
let username = document.getElementById("flip-username").value;
let password = document.getElementById("flip-password").value;

// Check if the username and password exist in the Airtable API
axios.get(`https://api.airtable.com/v0/${base_id}/${table_name}`, {
    params: {
        filterByFormula: `AND({Username} = "${username}", {Password} = "${password}")`
    },
    headers: headers_
})
.then((resp) => {
    console.log(resp);
    if (resp.data.records.length > 0) {
        // Store the username and password as variables
        const userUsername = username;
        const userPassword = password;

        // Get the other details for the user from Airtable
        axios.get(`https://api.airtable.com/v0/${base_id}/${table_name}`, {
            params: {
                filterByFormula: `AND({Username} = "${userUsername}", {Password} = "${userPassword}")`,
                fields: ['Score', 'Highscore', 'CurrLevel', 'loginout']
            },
            headers: headers_
        })
        .then((resp) => {
            console.log(resp);
            if (resp.data.records.length > 0) {
                const userData = resp.data.records[0].fields;
                const userScore = userData.Score;
                const userHighscore = userData.Highscore;
                const userCurrLevel = userData.CurrLevel;
                const userLoginout = userData.loginout;

                // Store the user data as variables and redirect to the level page
                localStorage.setItem('Username', userUsername);
                localStorage.setItem('Password', userPassword);
                localStorage.setItem('prevScore', userScore);
                localStorage.setItem('Highscore', userHighscore);
                localStorage.setItem('currLevel', userCurrLevel);
                localStorage.setItem('Loginout', userLoginout);

                // Update the fields
                var recordId = resp.data.records[0].id;
                var updateData = {
                    fields: {
                        loginout: "0"
                    }
                };
                axios.patch(`https://api.airtable.com/v0/${base_id}/${table_name}/${recordId}`, updateData, {
                    headers: headers_
                })
                .then(() => {
                    window.location.href = "levels/level1.html";
                })
                .catch(function(error) {
                    console.error(error);
                    alert('An error occurred, please try again later.');
                });

            } else {
                alert("We couldn't find your details in our records. Enter the right details to continue.");
            }
        })
        .catch(function(error) {
            console.error(error);
            alert('An error occurred, please try again later.');
        });
    } else {
        alert("We couldn't find your details in our records. Enter the right details to continue.");
    }
})
.catch(function(error) {
    console.error(error);
    alert('An error occurred, please try again later.');
});
})


