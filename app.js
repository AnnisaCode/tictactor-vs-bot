document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const restartBtn = document.getElementById('restartBtn');
    const playerTurn = document.getElementById('playerTurn');
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');

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

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = cells.indexOf(cell);

        if (gameState[cellIndex] !== '' || checkWin() || checkDraw() || currentPlayer === 'O') {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;

        if (currentPlayer === 'O') {
            board.style.pointerEvents = 'none'; // Nonaktifkan klik saat giliran bot
            setTimeout(botMove, 3000); // Menambahkan jeda 3 detik sebelum bot membuat langkah
        }
    };

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
            alert('Player O wins!');
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            return;
        }

        currentPlayer = 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
        board.style.pointerEvents = 'auto'; // Aktifkan kembali klik setelah bot bergerak
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
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
        board.style.pointerEvents = 'auto'; // Aktifkan kembali klik setelah restart
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});
