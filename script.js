document.addEventListener("DOMContentLoaded", () => {
  let secretNumber;
  let attempts = 0;
  let maxNumber;
  let timeLimit;
  let timerInterval;
  const maxAttempts = 10;

  const startBtn = document.getElementById("start-btn");
  const gameArea = document.querySelector(".game-area");
  const feedback = document.getElementById("feedback");
  const attemptsText = document.getElementById("attempts");
  const rangeText = document.getElementById("range-text");
  const difficultySelect = document.getElementById("difficulty");
  const timerDisplay = document.getElementById("time");

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

  startBtn.addEventListener("click", () => {
    const difficulty = difficultySelect.value;
    setDifficulty(difficulty);
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;

    rangeText.textContent = `Guess a number between 1 and ${maxNumber}:`;
    feedback.textContent = "";
    feedback.classList.remove("neon-green");
    feedback.style.color = "";
    attemptsText.textContent = "Attempts: 0";
    document.getElementById("guess").value = "";

    gameArea.style.display = "block";
    startBtn.style.display = "none";
    difficultySelect.disabled = true;

    startTimer(timeLimit);
    document.getElementById("check").disabled = false;
  });

  document.getElementById("check").addEventListener("click", () => {
    const guess = Number(document.getElementById("guess").value);

    if (!guess || guess < 1 || guess > maxNumber) {
      feedback.textContent = `⚠️ Please enter a valid number between 1 and ${maxNumber}`;
      feedback.style.color = "yellow";
      return;
    }

    if (guess === secretNumber) {
      feedback.textContent = "🎉 Hurray! You guessed it right!";
      feedback.classList.add("neon-green");
      document.getElementById("check").disabled = true;
      clearInterval(timerInterval);

      startBtn.textContent = "Play Again";
      startBtn.style.display = "block";
      difficultySelect.disabled = false;
      return;
    }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    if (guess < secretNumber) {
      feedback.textContent = "📉 Too low!";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "📈 Too high!";
      feedback.style.color = "orange";
    }

    if (attempts >= maxAttempts) {
      feedback.textContent = `💀 Game Over! The number was ${secretNumber}`;
      feedback.style.color = "red";
      document.getElementById("check").disabled = true;
      clearInterval(timerInterval);

      startBtn.textContent = "Play Again";
      startBtn.style.display = "block";
      difficultySelect.disabled = false;
    }
  });

  function startTimer(seconds) {
    let timeLeft = seconds;
    timerDisplay.textContent = timeLeft;

    clearInterval(timerInterval);
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

    startBtn.textContent = "Play Again";
    startBtn.style.display = "block";
    difficultySelect.disabled = false;
    gameArea.style.display = "none";
  }
});
