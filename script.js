"use strict";

//game codes
const cards = document.querySelectorAll(".memory_card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let errors = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  // first click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
  updateErrorCount();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function updateErrorCount() {
  errors++;
  document.getElementById("Errors").innerText = errors; // error count in the span updater
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function newGame() {
  resetBoard();
  errors = 0;
  document.getElementById("Errors").innerText = errors;

  // to reshuffle cards
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.classList.remove("flip"); // Ensure all cards are unflipped
    card.addEventListener("click", flipCard); // Re-add click event listener
  });
}

const newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", newGame);
