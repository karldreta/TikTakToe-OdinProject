function gameBoardObj() {
    const gameBoard = {
        board: ['', '', '', '', '', '', '', '', ''],
    };

    return {gameBoard}; // Note: You are returning an object, so when you invoke this function you will still have to dive deeper to get the array.
}

// Below: a factory for players
function createPlayer(name, marker) {
    // In here, you are returning a function which means you still have to invoke that function to get its return values (i.e. playerName, playerMarker).
    return function () {
        return { 
            playerName: name,
            playerMarker: marker
        };
    };
}

function playGame () {
    const board = gameBoardObj().gameBoard.board;
    const player1 = createPlayer("Jack", "X")();
    const player2 = createPlayer("Jill", "O")();
    let currentPlayer = player1;
    let gameRunning = true;

    const square = document.querySelectorAll('.square');
    square.forEach(square => square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        if (board[index] === '' && gameRunning) {
            board[index] = currentPlayer.playerMarker;
            square.textContent = currentPlayer.playerMarker;
            checkWinner(board);
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    }));

    function checkWinner (board) {
        const header = document.querySelector('#header h1');
        const winningCombinations =  [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        // Now, we need to iterate over the winningCombinations array. Each element in this array is itself an array that represents a winning combination of indices on the game board. If all the indices in one of these sub-arrays contain the same mark (either 'X' or 'O'), it indicates a win for the respective player.

        for (let combo of winningCombinations) {
            const [a, b, c] = combo; // Destructure each index for the next part.
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                header.textContent = `Winner: ${currentPlayer.playerName}`;
                gameRunning = false;
                return;
            }
        }

        if (board.every(square => square !== '')) {
            console.log("Draw");
            gameRunning = false;
        }
    };
};

playGame()
