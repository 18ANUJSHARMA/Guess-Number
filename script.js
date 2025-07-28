let secretNumber;
let attempts = 0;
let maxNumber;
let timeLimit;
let timerInterval;

const startBtn = document.querySelector(".btn");
const gameArea = document.querySelector(".game-area");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const rangeText = document.getElementById("range-text");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("time");

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
} else {
  body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    themeBtn.textContent = "Switch to Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeBtn.textContent = "Switch to Light Mode";
    localStorage.setItem("theme", "dark");
  }
});

// Difficulty logic
function setDifficulty(level) {
  if (level === "easy") {
    maxNumber = 10;
    timeLimit = 30;
  } else if (level === "medium") {
    maxNumber = 50;
    timeLimit = 45;
  } else {
    maxNumber = 100;
    timeLimit = 60;
  }
}

// Start game
startBtn.addEventListener("click", () => {
  const difficulty = difficultySelect.value;
  setDifficulty(difficulty);
  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;

  rangeText.textContent = `Guess a number between 1 and ${maxNumber}:`;
  feedback.textContent = "";
  attemptsText.textContent = "Attempts: 0";
  document.getElementById("guess").value = "";

  gameArea.style.display = "block";
  startBtn.style.display = "none";
  difficultySelect.disabled = true;

  startTimer(timeLimit);
});

document.getElementById("check").addEventListener("click", () => {
  const guess = Number(document.getElementById("guess").value);
  attempts++;

  if (guess === secretNumber) {
    endGame(true);
  } else if (guess < secretNumber) {
    feedback.textContent = "📉 Too low!";
    feedback.style.color = "orange";
  } else {
    feedback.textContent = "📈 Too high!";
    feedback.style.color = "orange";
  }

  attemptsText.textContent = `Attempts: ${attempts}`;
});

function startTimer(seconds) {
  let timeLeft = seconds;
  timerDisplay.textContent = timeLeft;

  clearInterval(timerInterval); // in case old one is running
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}

function endGame(won) {
  clearInterval(timerInterval);
  const message = won
    ? `🎉 Correct! You guessed it in ${attempts} attempt(s)!`
    : `⏱️ Time's up! The number was ${secretNumber}.`;

  feedback.textContent = message;
  feedback.style.color = won ? "lime" : "red";

  // Show reset option
  startBtn.textContent = "Play Again";
  startBtn.style.display = "block";
  difficultySelect.disabled = false;
  gameArea.style.display = "none";
}
