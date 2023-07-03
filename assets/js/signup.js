// SIGN UP AUTHENTICATION

var signupForm = document.getElementById("signup-form");

const headers_ = {
    'Authorization': 'Bearer API/TOKEN-KEY',
    'Content-Type': 'application/json'
};

const base_id = 'BASE-ID';
const table_name = 'TABLE-NAME/ID';

// When the form is submitted...
signupForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the form from submitting

    // Disable the submit button during the process
    const submitButton = document.getElementById("sform-submit");
    submitButton.addEventListener("click", function () {
        submitButton.disabled = true;
    });

    // Get the username and password values
    let username = document.getElementById("flip-username").value;
    let password = document.getElementById("flip-password").value;
    let score = document.getElementById("score").value;
    let highscore = document.getElementById("highscore").value;
    let currlevel = document.getElementById("currlevel").value;
    let loginout = document.getElementById("loginout").value;

    // Check if the username already exists in the Airtable API
    axios.get(`https://api.airtable.com/v0/${base_id}/${table_name}`, {
        params: {
            filterByFormula: `{Username} = "${username}"`
        },
        headers: headers_
    })
    .then((resp) => {
        console.log(resp);
        if (resp.data.records.length > 0) {
            alert("Username already exists. Please choose a different username.");

            // Enable the submit button again
            submitButton.addEventListener("click", function () {
                submitButton.disabled = false;
            });
        
        } else {
            // Create a new record in Airtable with the username and password
            const fields = {
                'Username': username,
                'Password': password,
                'Score': score,
                'Highscore': highscore,
                'CurrLevel': currlevel,
                'loginout': loginout,
            };

            axios.post(`https://api.airtable.com/v0/${base_id}/${table_name}`, { fields }, { headers: headers_ })
            .then((resp) => {
                console.log(resp);
                // Store the user data as variables
                localStorage.setItem('Username', username);
                localStorage.setItem('Password', password);
                localStorage.setItem('prevScore', score);
                localStorage.setItem('Highscore', highscore);
                localStorage.setItem('currLevel', currlevel);
                localStorage.setItem('Loginout', loginout);

                // Redirect to the login page
                window.location.href = "levels/level1.html";
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred, please try again later.');
                
                // Enable the submit button again
                submitButton.addEventListener("click", function () {
                    submitButton.disabled = false;
                });
            });
        }
    })
    .catch(function(error) {
        console.error(error);
        alert('An error occurred, please try again later.');

        // Enable the submit button again
        submitButton.addEventListener("click", function () {
            submitButton.disabled = false;
        });
    });
});
