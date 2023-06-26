var selectedCards = [];
var score = 0;
var prevScore = localStorage.getItem('prevScore');
var currLevel = localStorage.getItem('currLevel');


if (prevScore === undefined) {
    prevScore = 0;
} else {
    prevScore = Number(prevScore);
}

if (currLevel === undefined) {
    currLevel = 0;
} else {
    currLevel = Number(currLevel);
}

if (currLevel === 0) {
    window.location.href = 'level1.html';
} else if (currLevel === 1) {
    window.location.href = 'level2.html';
} else if (currLevel === 2) {
    window.location.href = 'level3.html';
} else if (currLevel === 4) {
    window.location.href = 'level5.html';
} else if (currLevel === 5) {
    window.location.href = 'level6.html';
} else if (currLevel === 6) {
    window.location.href = 'level7.html';
} else if (currLevel === 7) {
    window.location.href = 'level8.html';
} else if (currLevel === 8) {
    window.location.href = 'level9.html';
} else if (currLevel === 9) {
    window.location.href = 'level10.html';
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
        }
    }
}

function levelCompleted() {
    var levelCompletedPrompt = document.createElement('div');
    levelCompletedPrompt.className = 'level-completed';
    levelCompletedPrompt.innerHTML = 'Level Completed! Your score is ' + score;
    document.body.appendChild(levelCompletedPrompt);
    currLevel = 1 + currLevel;

    localStorage.setItem('prevScore', score);
    localStorage.setItem('currLevel', currLevel);

    setTimeout(function() {
        var confirmation = confirm('Level Completed! Your score is ' + score + '. Proceed to Level 2?');
        if (confirmation) {
            window.location.href = 'level3.html';
        } else {
            // Handle the user's choice if they don't want to proceed to the next level
            window.location.href = 'level3.html';
        }
    }, 3000);
}