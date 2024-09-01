const pond = document.getElementById('pond');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const startButton = document.getElementById('startButton');
const retryButton = document.getElementById('retryButton');

let score = 0;
let timeLeft = 15;  // Timer set to 15 seconds
let gameInterval;
let fishInterval;
const fishCountToWin = 20;  // Score needed to win is now 20 fish
const badImages = ['ecouple.png', 'babydrool.png', 'marianne.png'];  // Bad images to avoid

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 15;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    messageDisplay.textContent = '';
    startButton.style.display = 'none';
    retryButton.style.display = 'none';

    clearInterval(gameInterval);
    clearInterval(fishInterval);

    gameInterval = setInterval(updateTimer, 1000);
    fishInterval = setInterval(addFish, 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        endGame();
    }
}

function addFish() {
    const numberOfFish = Math.floor(Math.random() * 3) + 1; // Random number of fish between 1 and 3
    for (let i = 0; i < numberOfFish; i++) {
        const fish = document.createElement('img');
        fish.src = 'fish.png';  // Local fish image file
        fish.classList.add('fish');
        fish.style.left = `${Math.random() * (pond.offsetWidth - 60)}px`;
        fish.style.top = `${Math.random() * (pond.offsetHeight - 60)}px`;

        fish.addEventListener('click', () => {
            fish.remove();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            if (score >= fishCountToWin) {
                endGame(true);
            }
        });

        pond.appendChild(fish);

        setTimeout(() => {
            fish.remove();
        }, 4000);  // Fish disappears after 4 seconds
    }

    // Randomly add a bad image to the pond
    if (Math.random() < 0.3) { // 30% chance to add a bad image
        const badImage = document.createElement('img');
        const badImageType = badImages[Math.floor(Math.random() * badImages.length)];
        badImage.src = badImageType;
        badImage.classList.add('fish');
        badImage.style.left = `${Math.random() * (pond.offsetWidth - 60)}px`;
        badImage.style.top = `${Math.random() * (pond.offsetHeight - 60)}px`;

        badImage.addEventListener('click', () => {
            if (badImageType === 'ecouple.png') {
                endGame(false, 'Game Over! You clicked the e-couple');
            } else if (badImageType === 'marianne.png') {
                endGame(false, 'Game Over! You clicked Marianne');
            } else if (badImageType === 'babydrool.png') {
                endGame(false, 'Game Over! You clicked the baby drool');
            }
        });

        pond.appendChild(badImage);

        setTimeout(() => {
            badImage.remove();
        }, 4000);  // Bad image disappears after 4 seconds
    }
}

function endGame(win = false, loseMessage = '') {
    clearInterval(gameInterval);
    clearInterval(fishInterval);

    if (loseMessage) {
        messageDisplay.textContent = loseMessage;
    } else if (win) {
        messageDisplay.textContent = 'You said you haven\'t been fishing in a while, hope this helps you not miss out on it 💪';
    } else {
        messageDisplay.textContent = 'Time\'s up! It\'s been a while since you went fishing, looks like you\'re not so pro anymore 🥲';
    }

    retryButton.style.display = 'inline-block';
}
