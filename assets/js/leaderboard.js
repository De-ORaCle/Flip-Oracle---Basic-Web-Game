// SIGN IN AUTHENTICATION

var thisForm = document.getElementById("signin-form");
const headers_ = {
    'Authorization': 'Bearer API/TOKEN-KEY',
    'Content-Type': 'application/json'
};

const base_id = 'BASE-ID';
const table_name = 'TABLE-NAME/ID';

// Function to update leaderboard HTML
function updateLeaderboard(username, highscore) {
  const leaderboard = document.querySelector('.leaderboard');
  const boards = leaderboard.getElementsByClassName('board');

  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    const usernameElement = board.querySelector('.leader-username');
    const scoreElement = board.querySelector('.leader-score');

    if (i < username.length) {
      usernameElement.textContent = username[i];
      scoreElement.textContent = highscore[i];
    } else {
      usernameElement.textContent = '';
      scoreElement.textContent = '';
    }
  }
}

// Function to retrieve data from Airtable and update leaderboard
function fetchLeaderboardData() {
  const url = `https://api.airtable.com/v0/${base_id}/${table_name}?sort%5B0%5D%5Bfield%5D=Highscore&sort%5B0%5D%5Bdirection%5D=desc`;

  fetch(url, { headers: headers_ })
    .then(response => response.json())
    .then(data => {
      const records = data.records.slice(0, 5); // Get the top 5 records
      
      const username = records.map(record => record.fields.Username);
      const highscore = records.map(record => record.fields.Highscore);

      updateLeaderboard(username, highscore);
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to fetch leaderboard data and update HTML
fetchLeaderboardData();
