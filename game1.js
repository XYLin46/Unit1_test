let score = 0;
let lastHole;
let gameTimer;

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const idx = Math.floor(Math.random() * holes.length);
    if (holes[idx] === lastHole) return randomHole(); // 避免連續重複同一個洞
    lastHole = holes[idx];
    return holes[idx];
}

function peep() {
    const hole = randomHole();
    hole.classList.add('has-mole'); // CSS 讓有這個 class 的洞變紅色或冒出地鼠
    setTimeout(() => {
        hole.classList.remove('has-mole');
    }, 800); // 地鼠停留 0.8 秒
}

function startGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    gameTimer = setInterval(peep, 1000); // 每秒冒出一隻地鼠
    setTimeout(() => clearInterval(gameTimer), 15000); // 遊戲時間 15 秒
}

// 監聽點擊
document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('has-mole')) {
            score++;
            document.getElementById('score').innerText = score;
            hole.classList.remove('has-mole'); // 打中後消失
        }
    });
});