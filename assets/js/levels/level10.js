var selectedCards = [];
var score = 0;
var prevScore = localStorage.getItem('prePrev');
var currLevel = localStorage.getItem('currLevel');
var highscore = localStorage.getItem('Highscore');

if (prevScore === undefined) { // Check if prevScore is null instead of undefined
    prevScore = 0;
} else {
    prevScore = Number(prevScore);
}

if (currLevel === undefined) { // Check if currLevel is null instead of undefined
    currLevel = 0;
} else {
    currLevel = Number(currLevel);
}

if (currLevel === 0) {
    window.location.href = 'level1.html';
} else if (currLevel === 2) {
    window.location.href = 'level3.html';
} else if (currLevel === 1) {
    window.location.href = 'level2.html';
} else if (currLevel === 4) {
    window.location.href = 'level5.html';
} else if (currLevel === 3) {
    window.location.href = 'level4.html';
} else if (currLevel === 6) {
    window.location.href = 'level7.html';
} else if (currLevel === 5) {
    window.location.href = 'level6.html';
} else if (currLevel === 8) {
    window.location.href = 'level9.html';
} else if (currLevel === 7) {
    window.location.href = 'level8.html';
} else if (currLevel === 10) {
    window.location.href = 'completed.html';
} else {
    // Handle other cases or redirect to a default level
}

score += prevScore;

var scoreElement = document.getElementById('score');
scoreElement.textContent = score;

var cards = document.getElementsByClassName('card');
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', cardClick);
}

function cardClick() {
    var img = this.querySelector('img');

    if (!this.classList.contains('selected') && !this.classList.contains('matched')) {
        img.style.display = 'block';
        this.classList.add('selected');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            var card1 = selectedCards[0].querySelector('img');
            var card2 = selectedCards[1].querySelector('img');

            if (card1.src === card2.src) {
                score += 10;
                setTimeout(function() {
                    selectedCards[0].classList.add('matched');
                    selectedCards[1].classList.add('matched');
                    selectedCards = [];

                    if (document.getElementsByClassName('card').length === document.getElementsByClassName('matched').length) {
                        levelCompleted();
                    }
                }, 500);
            } else {
                score -= 2;
                setTimeout(function() {
                    card1.style.display = 'none';
                    card2.style.display = 'none';
                    selectedCards[0].classList.remove('selected');
                    selectedCards[1].classList.remove('selected');
                    selectedCards = [];
                }, 1000);
            }

            scoreElement.textContent = score;
            localStorage.setItem('prevScore', score);
            
            // Update the highscore if the current score is higher
            if (score >= highscore) {
                highscore = score;
                localStorage.setItem('Highscore', highscore);
            }
        }
    }
}


function levelCompleted() {
    currLevel = 1 + currLevel;
    localStorage.setItem('currLevel', currLevel);

    var levelCompletedPrompt = document.createElement('div');
    levelCompletedPrompt.className = 'level-completed';
    levelCompletedPrompt.innerHTML = 'Level Completed! Your score is ' + score;
    document.body.appendChild(levelCompletedPrompt);

    // Update the score, level, and highscore in the Airtable base
    var username = localStorage.getItem('Username');
    var password = localStorage.getItem('Password');
    var score = localStorage.getItem('prevScore');
    var Highscore = localStorage.getItem('Highscore');
    var level = localStorage.getItem('currLevel');


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
                    Score: score,
                    CurrLevel: level,
                    Highscore: Highscore
                }
            };
            axios.patch(`https://api.airtable.com/v0/${base_id}/${table_name}/${recordId}`, updateData, {
                headers: headers_
            })
            .then(() => {
               // Redirect to the next level or handle completion
                if (currLevel <= 10) {
                    var confirmation = confirm('Level Completed! Your score is ' + score + '. Proceed to the next level?');
                    if (confirmation) {
                        window.location.href = 'level' + (currLevel + 1) + '.html';
                    } else {
                        // Handle the user's choice if they don't want to proceed to the next level
                        window.location.href = 'level' + (currLevel + 1) + '.html';
                    }
                } else {
                    window.location.href = 'completed.html';
                }
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
}
