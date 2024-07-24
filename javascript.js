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
    whoseTurn = false;
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function whose(){ 
        if(whoseTurn){
            whoseTurn = false;
        }else{
            whoseTurn = true;
        }

        return whoseTurn;}

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
        checkDraw: checkDraw,
        whose: whose
    };
})();

function Player(name,symbol){
    this.name = name;
    this.symbol = symbol;
    this.moves = [];
}

const p1 = new Player("Jason", 'X');
const p2 = new Player("Adam", 'O');


const header = document.querySelector(".header");
const button = document.querySelector("button");
button.addEventListener("click", () => {
    location.reload();
});

//dom stuff
for(let i = 0; i <= 8; i++){
    let cell = document.getElementById(`${i}`);
    cell.addEventListener("click", () => {
        cell.style.fontSize = "3rem";
        if(cell.textContent != "🙅" && cell.textContent != "🙆"){
            
            if(game.whose()){
                p1.moves.push(i);
                gameBoard.makeMove(i, 'x');
                cell.textContent = "🙅";
                console.warn(game.checkWin(p1.moves));
                if(game.checkWin(p1.moves)){
                    header.textContent = "You have been Slain.";
                }
            }else{
                p2.moves.push(i);
                gameBoard.makeMove(i, 'o');
                cell.textContent = "🙆";
                console.warn(game.checkWin(p2.moves));
                if(game.checkWin(p2.moves)){
                    header.textContent = "You have chosen Death.";
                }
            }
            console.table(gameBoard.getBoard());
            console.log(game.checkDraw(gameBoard.getBoard()));
            if(game.checkDraw(gameBoard.getBoard())){
                header.textContent = "Evenly Skilled";
            }
        
        }
    });
}