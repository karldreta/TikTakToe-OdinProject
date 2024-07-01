
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
    const player1 = createPlayer("Karl", "X")();
    const player2 = createPlayer("James", "O")();
    let currentPlayer = player1;

    const square = document.querySelectorAll('.square');
    square.forEach(square => square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        // console.log(currentPlayer);
        if (currentPlayer === player1) {
            if (board[index] === '') {
                board[index] = currentPlayer.playerMarker;
                currentPlayer = player2;
            } else {
                console.log("Not empty");
            }
        } else {
            if (board[index] === '') {
            board[index] = currentPlayer.playerMarker;
            currentPlayer = player1;
            }
            else {
                console.log("Not empty");
            }
        }
        console.log(board); // I need to return this
        return board
    }));

};

function checkWinner () {
    return 
}

playGame();
