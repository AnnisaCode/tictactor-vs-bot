document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const restartBtn = document.getElementById('restartBtn');
    const playerTurn = document.getElementById('playerTurn');
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let scoreX = 0;
    let scoreO = 0;
    const scoreXEl = document.getElementById('scoreX');
    const scoreOEl = document.getElementById('scoreO');
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function showNotification(message, type = 'info') {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-center',
            timeOut: 2000
        };
        toastr[type](message);
    }

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = cells.indexOf(cell);
        if (gameState[cellIndex] !== '' || checkWin() || checkDraw() || currentPlayer === 'O') {
            return;
        }
        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            highlightWinner();
            scoreX++;
            scoreXEl.textContent = scoreX;
            showNotification('Player X wins!', 'success');
            return;
        }
        if (checkDraw()) {
            showNotification("It's a draw!", 'warning');
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
        if (currentPlayer === 'O') {
            board.style.pointerEvents = 'none';
            setTimeout(botMove, 1200);
        }
    };

    function highlightWinner() {
        const winnerCombo = winningConditions.find(condition =>
            condition.every(index => gameState[index] === currentPlayer)
        );
        if (winnerCombo) {
            winnerCombo.forEach(idx => cells[idx].classList.add('winner'));
        }
    }

    const botMove = () => {
        let emptyCells = [];
        gameState.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        if (checkWin()) {
            highlightWinner();
            scoreO++;
            scoreOEl.textContent = scoreO;
            showNotification('Bot O wins!', 'error');
            board.style.pointerEvents = 'auto';
            return;
        }
        if (checkDraw()) {
            showNotification("It's a draw!", 'warning');
            board.style.pointerEvents = 'auto';
            return;
        }
        currentPlayer = 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
        board.style.pointerEvents = 'auto';
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const restartGame = () => {
        gameState.fill('');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
        currentPlayer = 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
        board.style.pointerEvents = 'auto';
    };

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }

    toggleThemeBtn.addEventListener('click', toggleTheme);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});
