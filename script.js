document.addEventListener('DOMContentLoaded', () => {
    function gameBoardObj() {
        const gameBoard = {
            board: ['', '', '', '', '', '', '', '', ''],
        };
        return { gameBoard }; // Note: You are returning an object, so when you invoke this function you will still have to dive deeper to get the array.
    }

    // Below: a factory for players
    function createPlayer(name, marker) {
        // In here, you are returning a function which means you still have to invoke that function to get its return values (i.e. playerName, playerMarker).
        return function () {
            return { 
                playerName: name,
                playerMarker: marker,
                score: 0,
            };
        };
    }

    function startGame () {
        const playerInputForm = document.querySelector('.playerInput')
        const playerNames = document.querySelector('#playerNameInputs');
        const playerX = document.querySelector('#playerX');
        const playerO = document.querySelector('#playerO');
        const scoreBoard = document.querySelector('#scoreBoard');
        scoreBoard.style.display = 'none';
        const gameTitle = document.querySelector('#header');
        gameTitle.style.display = 'none';
        const gameBoard = document.querySelector("#gameBoard");
        gameBoard.style.display = 'none';
        const navPanel = document.querySelector('.nav-panel');
        navPanel.style.display = 'none';
        const showInputErrors = document.querySelectorAll('.showError');


        playerNames.addEventListener('submit', e => {
            e.preventDefault();
            const playerXName = playerX.value;
            const playerOName = playerO.value;

             if (playerXName === "" || playerOName === "") {
                showInputErrors.forEach(error => {
                error.textContent = '* Required';
            });
            return;
        }
                playerInputForm.close();
                playerInputForm.style.display = 'none';
                scoreBoard.style.display = 'flex';
                gameTitle.style.display = 'block';
                gameBoard.style.display = 'grid';
                navPanel.style.display = 'grid';
                playGame(playerXName, playerOName, scoreBoard);
        });

    }


    startGame()

    function playGame(playerXName, playerOName, scoreBoard) {
        let board = gameBoardObj().gameBoard.board;
        const player1 = createPlayer(playerXName, "X")();
        const player2 = createPlayer(playerOName, "O")();
        
        // Score Board
        let displayPlayer1Score = scoreBoard.querySelector('.player1Score');
        let displayPlayer2Score = scoreBoard.querySelector('.player2Score');
        displayPlayer1Score.textContent = `${player1.playerName}: `;
        displayPlayer2Score.textContent = `${player2.playerName}: `;

        let currentPlayer = player1;
        let lastPlayer = player2;
        let gameRunning = true;
        const header = document.querySelector('h1');
        header.textContent = `${currentPlayer.playerName} goes first`;

        const square = document.querySelectorAll('.square');
        square.forEach(square => square.addEventListener('click', () => {
            const index = square.getAttribute('data-index');
            if (board[index] === '' && gameRunning) {
                board[index] = currentPlayer.playerMarker;
                square.textContent = currentPlayer.playerMarker;
                if (currentPlayer === player1) {
                    currentPlayer = player2;
                    lastPlayer = player1;
                    header.textContent = `${currentPlayer.playerName}'s turn`
                } else {
                    currentPlayer = player1;
                    lastPlayer = player2;
                    header.textContent = `${currentPlayer.playerName}'s turn`
                }
                checkWinner(board);
                
            }
        }));

        function checkWinner(board) {
            const winningCombinations = [
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
                    header.textContent = `Round Winner: ${lastPlayer.playerName}!`;
                    // Below: Track the scores
                    if (lastPlayer === player1) {
                        // The Score is taken from the player object
                        player1.score++;
                    } else if (lastPlayer === player2) {
                        player2.score++;
                    }
                    displayPlayer1Score.textContent = `${player1.playerName}: ${player1.score}`;
                    displayPlayer2Score.textContent = `${player2.playerName}: ${player2.score}`;
                    gameRunning = false;
                    return;
                }
            }

            if (board.every(square => square !== '')) {
                header.textContent = "Draw";
                gameRunning = false;
            }
        }

        // Below: To restart the game
        const resetBtn = document.querySelector('#reset');
        resetBtn.addEventListener('click', restartGame);

        function restartGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            square.forEach(square => square.textContent = '');
            currentPlayer = player1;
            gameRunning = true;
            const header = document.querySelector('h1');
            header.textContent = `${currentPlayer.playerName} goes first`;
        }

        // Below to switch player marks
        const switchBtn = document.querySelector('#switch');
        switchBtn.addEventListener('click', switcheroo);

        function switcheroo () {
            board = ['', '', '', '', '', '', '', '', ''];
            square.forEach(square => square.textContent = '');
            currentPlayer = player2;
            gameRunning = true;
            const header = document.querySelector('h1');
            header.textContent = `Switched: ${currentPlayer.playerName} goes first`;
        }
    }
});
