const game = document.getElementById('game');
const btnReset = document.getElementById('btnReset');
const table = [[null, null, null],
               [null, null, null],
               [null, null, null]];
let l, c;
let player = "X", moves = 0;
btnReset.addEventListener('click', resetGame);
game.addEventListener('click', (e) => {
    const tg = e.target;
    l = parseInt(tg.getAttribute('l'));
    c = parseInt(tg.getAttribute('c'));
    if (table[l][c]) {
        return;
    }
    table[l][c] = player;
    tg.innerHTML = player;
    moves++;
    if (gameOver(l, c, player)) {
        alert(`Congratulations ${player}! You win`);
        btnReset.disabled = false;
    } else if (moves == 9) {
        alert('The game is a draw!');
        btnReset.disabled = false;
    } else {
        switchPlayer();
    }
});
generateTable();

function gameOver(l, c, player) {
    let cnt = 0;
    //check the line
    for (let i = 0; i < 3; i++) {
        if (table[l][i] == player) {
            cnt++;
        }
    }
    if (cnt == 3) {
        return true;
    }
    cnt = 0;
    //check the column
    for (let i = 0; i < 3; i++) {
        if (table[i][c] == player) {
            cnt++;
        }
    }
    if (cnt == 3) {
        return true;
    }
    // check the main diagonal
    if (l == c) {
        cnt = 0;
        for (let i = 0; i < 3; i++) {
            if (table[i][i] == player){
                cnt++;
            }
        }
    } else if (l + c == 2) { // check the secondary diagonal
        cnt = 0;
        for (let i = 0; i < 3; i++) {
            if (table[i][3 - i - 1] == player){
                cnt++;
            }
        }
    }
    if (cnt == 3) {
        return true;
    } else {
        return false;
    }
}

function switchPlayer() {
    if (player == "X") {
        player = "0";
    } else {
        player = "X"; // or "player = player == "X" ? "0" : "X";
    }
    document.getElementById('player').textContent = player;
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            table[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[l]')).forEach(e=> {
        e.textContent = null;
    });
    document.getElementById('player').textContent = player;
    moves = 0;
    btnReset.disabled = true;
}

function generateTable() {
    let l, c;
    for (let i = 0; i < 9; i++) {
        let e = document.createElement('div');
        l = Math.round((i + 2) / 3) -1;
        c = Math.round(i % 3);
        e.setAttribute('l', l);
        e.setAttribute('c', c);
        game.appendChild(e);
    }
}
