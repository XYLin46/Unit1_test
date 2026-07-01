let score = 0;
let lastHole;
let gameTimer;
let countdownTimer;
let timeLeft = 15;

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const idx = Math.floor(Math.random() * holes.length);
    if (holes[idx] === lastHole) return randomHole(); // 避免連續重複同一個洞
    lastHole = holes[idx];
    return holes[idx];
}

function clearHoleState(hole) {
    hole.classList.remove('has-mole');
    hole.classList.remove('has-cat');
    hole.classList.remove('hit');
}

function peep() {
    const hole = randomHole();
    const isMole = Math.random() < 0.7; // 70% 地鼠, 30% 貓咪

    clearHoleState(hole);

    if (isMole) {
        hole.classList.add('has-mole'); // 地鼠
    } else {
        hole.classList.add('has-cat'); // 貓咪
    }

    setTimeout(() => {
        clearHoleState(hole);
    }, 800); // 角色停留 0.8 秒
}

function updateTimeDisplay() {
    document.getElementById('time').innerText = timeLeft;
}

function getRandomPeepDelay() {
    return Math.floor(Math.random() * 801) + 700; // 700~1500ms
}

function startPeepLoop() {
    peep();
    const delay = getRandomPeepDelay();
    gameTimer = setTimeout(startPeepLoop, delay);
}

function startGame() {
    score = 0;
    timeLeft = 15;
    document.getElementById('score').innerText = score;
    updateTimeDisplay();

    clearTimeout(gameTimer);
    clearInterval(countdownTimer);

    document.querySelectorAll('.hole').forEach(hole => {
        clearHoleState(hole);
    });

    startPeepLoop();
    countdownTimer = setInterval(() => {
        timeLeft--;
        updateTimeDisplay();
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            clearTimeout(gameTimer);
        }
    }, 1000);
}

// 監聽點擊
document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('has-mole')) {
            score++;
            hole.classList.add('hit');
            setTimeout(() => {
                hole.classList.remove('hit');
            }, 180);
        } else {
            score = Math.max(0, score - 2);
            if (hole.classList.contains('has-cat')) {
                hole.classList.add('hit');
                setTimeout(() => {
                    hole.classList.remove('hit');
                }, 180);
            }
        }
        document.getElementById('score').innerText = score;
    });
});