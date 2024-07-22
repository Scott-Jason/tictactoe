console.log("Hey J");

const gameBoard = (function() {
    //private
    const board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

    // ...board provides a shallow copy of board so im not letting user access board
    function getBoard() {return [...board];}
    function makeMove(index, player) {board[index] = player;}
    
    //public API
    return{
        getBoard: getBoard,
        makeMove: makeMove
    };
})();

const game = (function() {

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWin(moves) {
        for(let i = 0; i < winConditions.length; i++){
            if(winConditions[i].every(move => moves.includes(move))){
                return true;
            }
        }
        return false;
    }

    function checkDraw(board) { return !board.includes(' ');}

    return{
        checkWin: checkWin,
        checkDraw: checkDraw
    };
})();

function Player(name,symbol){
    this.name = name;
    this.symbol = symbol;
    this.moves = [];
}

const p1 = new Player("Jason", 'X');
const p2 = new Player("Adam", 'O');

// other stuff
//garbage

for(let i = 0; i < 10; i++){
     gameBoard.makeMove(i, 'x');

}
console.log("JORG");
console.log(gameBoard.getBoard());
console.log(game.checkDraw(gameBoard.getBoard()));


console.log("FRED");
console.log(game.checkWin(p2.moves));


console.table(gameBoard.getBoard());
gameBoard.makeMove(1, 'x');


console.log(gameBoard.getBoard().includes('o'));

