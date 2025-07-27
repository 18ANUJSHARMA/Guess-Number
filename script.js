let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const startBtn = document.querySelector(".btn");
const gameArea = document.querySelector(".game-area");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");

startBtn.addEventListener("click", () => {
    gameArea.style.display = "block";
    startBtn.style.display = "none"; // hide start button
});

document.getElementById("check").addEventListener("click", () => {
    const guess = Number(document.getElementById("guess").value);
    attempts++;

    if (guess === secretNumber) {
        feedback.textContent = "🎉 You guessed it right!";
        feedback.style.color = "lime";
    } else if (guess < secretNumber) {
        feedback.textContent = "📉 Too low!";
        feedback.style.color = "orange";
    } else {
        feedback.textContent = "📈 Too high!";
        feedback.style.color = "orange";
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
});
