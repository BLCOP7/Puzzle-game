// script.js
document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const messageDiv = document.getElementById('message');
    const shuffleButton = document.getElementById('shuffle-button');

    const puzzlePieces = [
        'A', 'B', 'C',
        'D', 'E', 'F',
        'G', 'H', 'I'
    ];

    const correctOrder = [...puzzlePieces];
    let currentOrder = [...puzzlePieces];

    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        currentOrder.forEach(piece => {
            const pieceDiv = document.createElement('div');
            pieceDiv.classList.add('puzzle-piece');
            pieceDiv.textContent = piece;
            pieceDiv.addEventListener('click', () => onPieceClick(piece));
            puzzleContainer.appendChild(pieceDiv);
        });
    }

    function onPieceClick(piece) {
        const index = currentOrder.indexOf(piece);
        const emptyIndex = currentOrder.indexOf('');

        if ([index - 1, index + 1, index - 3, index + 3].includes(emptyIndex)) {
            currentOrder[emptyIndex] = piece;
            currentOrder[index] = '';
            renderPuzzle();
            checkWin();
        }
    }

    function shuffle() {
        for (let i = currentOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
        }
        renderPuzzle();
    }

    function checkWin() {
        if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
            messageDiv.textContent = "Congratulations! You've completed the puzzle!";
        } else {
            messageDiv.textContent = '';
        }
    }

    shuffleButton.addEventListener('click', shuffle);

    // Initialize the game
    currentOrder[currentOrder.length - 1] = '';
    renderPuzzle();
});
