// const square = document.querySelectorAll('.square');
// square.forEach(square => square.addEventListener('click', placeMarker));

function gameBoardObj () {
    return ['', '', '', '', '', '', '', '', '',];
};
                
function createPlayer(name, marker) {
    return function () {
        return { 
            playerName: name,
            playerMarker: marker
        };
    };
}

function playGame () {
    const board = gameBoardObj();

    return board
};

console.log(playGame());