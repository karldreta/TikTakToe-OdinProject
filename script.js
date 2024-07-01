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

    const square = document.querySelectorAll('.square');
    square.forEach(square => square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        console.log(currentPlayer);
        if (board[index] === '') {
            board[index] = currentPlayer.playerMarker;
            checkWinner(board);
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        } else {
            console.log("Not empty");
        }
    }));

    function checkWinner (board) {
        console.log(board);
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

        for (let combo of winningCombinations) {
            const [a, b, c] = combo; // Destructure each index for the next part.
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(`Winner: ${currentPlayer.playerName}`);
                return;
            }
        }

        if (board.every(square => square !== '')) {
            console.log("Draw");
        }
    };
};



playGame()
