// Get the parent container of the cards
const cardsContainer = document.querySelector('.cards');

// Convert the NodeList of cards into an array
const cardsArray = Array.from(cardsContainer.children);

// Shuffle the cards array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the cards on page load
window.addEventListener('load', function () {
  const shuffledCards = shuffleArray(cardsArray);

  // Remove existing cards from the container
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }

  // Append the shuffled cards back to the container
  shuffledCards.forEach(function (card) {
    cardsContainer.appendChild(card);
  });
});
