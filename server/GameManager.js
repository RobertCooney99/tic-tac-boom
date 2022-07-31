class Player {
    constructor(emoji) {
        this.emoji = emoji;
    }

    getEmoji() {
        return this.emoji;
    }
}

class GameManager {
    constructor() {
        this.playerOne = new Player('❌');
        this.playerTwo = new Player('⭕️');
        this.bombInProgress = false;
        this.playerOneIsNext = true;
    }

    setMethods = (board, status) => {
        this.setBoard = board;
        this.setStatus = status;
    }

    initialiseBoard = (board) => {
        this.board = board;
    }

    updateBoard = (board) => {
        this.board = board;
        this.setBoard(board);
    }

    resetGame = () => {
        if (!this.bombInProgress) {
            this.updateBoard([[null, null, null], [null, null, null], [null, null, null]]);
            this.playerOneIsNext = true;
            this.bombInProgress = false;
            this.calcStatus();
        }
    };

    calcStatus = () => {
        let status;
        if (this.bombInProgress) {
            status = 'BOOM!';
        } else {
            const winner = calculateWinner(this.board);
            if (winner) {
                status = `${winner} wins!`;
            } else {
                status = `Player ${this.playerOneIsNext ? this.playerOne.getEmoji() : this.playerTwo.getEmoji()}'s turn...`;
            }
        }
        this.setStatus(status);
    };

    handleClick = (x,y) => {
        console.log("Handling click at: " + x + "," + y);
    
        if (calculateWinner(this.board) || this.board[x][y] || this.bombInProgress) {
            return;
        }
    
        const randomNumber = Math.floor(Math.random() * 4);
        let bomb;
        if (randomNumber === 1) {
            bomb = true;
        }
    
        if (!bomb) {
            const current = this.board.map((x) => x);
            current[x][y] = this.playerOneIsNext ? this.playerOne.getEmoji() : this.playerTwo.getEmoji();
            this.updateBoard(current);
            this.playerOneIsNext = !this.playerOneIsNext;
            this.calcStatus(this.board);
        } else {
            this.playerOneIsNext = !this.playerOneIsNext;
            this.bombInProgress = true;
            this.calcStatus(this.board);
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber === 1) {
                this.plantBigBomb(x,y);
            } else {
                this.plantSmallBomb(x,y);
            }
        }
    };

    plantSmallBomb = (x,y) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x,y,'🧨'))
          .then(() => delay(400))
          .then(() => this.explodeBomb(x,y))
          .then(() => delay(300))
          .then(() => this.spreadBombToSurroundingArea(x,y))
          .then(() => delay(300))
          .then(() => this.cleanUpBomb(x,y));
    }
    
    plantBigBomb = (x,y) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x, y, '💣'))
          .then(() => delay(500))
          .then(() => this.explodeBomb(x,y))
          .then(() => delay(250))
          .then(() => this.spreadBigBombToSurroundingArea([[x,y]], [[x,y]]))
          .then(() => delay(250))
          .then(() => this.clearBoardFromExplosion());
    }

    placeBombOnBoard = (x,y,bomb) => {
        const current = this.board.map((x) => x);
        current[x][y] = bomb;
        this.updateBoard(current);
    }

    explodeBomb = (x,y) => {
        let newSquares = this.board.map((x) => x);
        newSquares[x][y] = '💥';
        this.updateBoard(newSquares);
    }

    spreadBombToSurroundingArea = (x,y) => {
        const surroundingCoordinates = calculateSurroundingCoordinates(x,y,false);
        const newSquares = this.board.map((x) => x);
        for (let coordinates of surroundingCoordinates) {
            newSquares[coordinates[0]][coordinates[1]] = '💥';
        }
        console.log(newSquares);
        this.updateBoard(newSquares);
    }
    
    spreadBigBombToSurroundingArea = (coordinatesToExplode, alreadyExplodedSquares) => {
        if (alreadyExplodedSquares.length >= 9) {
          return;
        } else {
            let surroundingCoordinates = [];
            let allSurroundingCoordinates = [];
            for (let coordinates of coordinatesToExplode) {
                surroundingCoordinates.push(calculateSurroundingCoordinates(coordinates[0], coordinates[1], false));
            }
            for (let coordinatesArray of surroundingCoordinates) {
                for (let coordinates of coordinatesArray) {
                    allSurroundingCoordinates.push(coordinates);
                }
            }
            allSurroundingCoordinates = [...new Set(allSurroundingCoordinates)];
    
            let squaresToExplode = allSurroundingCoordinates.filter(x => {
                for (let y of alreadyExplodedSquares) {
                    if (compareArrays(x,y)) {
                        return false;
                    }
                }
                return true;
            });
    
            squaresToExplode = removeDuplicatesFromArray(squaresToExplode);
    
            const newSquares = this.board.map((x) => x);
            for (let coordinates of squaresToExplode) {
                newSquares[coordinates[0]][coordinates[1]] = '💥';
                alreadyExplodedSquares.push([coordinates[0],coordinates[1]]);
            }
            this.updateBoard(newSquares);
            return Promise.resolve().then(() => delay(250)).then(() => this.spreadBigBombToSurroundingArea(squaresToExplode, alreadyExplodedSquares));
        }
    }
    
    cleanUpBomb = (x,y) => {
        const surroundingCoordinates = calculateSurroundingCoordinates(x,y,false);
        let newSquares = this.board.map((x) => x);
        newSquares[x][y] = null;
        for (let coordinates of surroundingCoordinates) {
            newSquares[coordinates[0]][coordinates[1]] = null;
        }
        this.updateBoard(newSquares);
        this.bombInProgress = false;
        this.calcStatus(newSquares);
    }
    
    clearBoardFromExplosion = () => {
        const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
        this.updateBoard(newSquares);
        this.bombInProgress = false;
        this.calcStatus(newSquares);
    }
}

calculateWinner = (squares) => {
    if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
        return squares[0][0];
    } else if (squares[2][0] && squares[2][0] === squares[1][1] && squares[2][0] === squares[0][2]) {
        return squares[2][0];
    }

    for (let i = 0; i <= 2; i++) {
        if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
            return squares[i][0];
        } else if (squares[0][i] && squares[0][i] === squares[1][i] && squares[0][i] === squares[2][i]) {
            return squares[0][i];
        }
    }

    let count = 0;

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (squares[i][j]) {
                count++;
            }
        }
    }

    if (count === 9) {
        return "No one";
    }

    return null;
}

checkIfWinningMove = (squares, x, y, icon) => {
    const newSquares = [[null, null, null], [null, null, null], [null, null, null]];
    for (let i in squares) {
        for (let j in squares[i]) {
            newSquares[i][j] = squares[i][j];
        }
    }

    newSquares[x][y] = icon;

    if (calculateWinner(newSquares) === icon) {
        console.log("WINNING MOVE");
        return true;
    } else {
        console.log("NOT A W MOVE");
        return false;
    }
}

checkIfSetUpWinningMove = (squares, x, y, icon) => {
    const newSquares = [[null, null, null], [null, null, null], [null, null, null]];
    for (let i in squares) {
        for (let j in squares[i]) {
            newSquares[i][j] = squares[i][j];
        }
    }
    newSquares[x][y] = icon;

    let numberOfWinningMovesSetUp = 0;

    for (let i in newSquares) {
        for (let j in newSquares) {
            if (!newSquares[i][j]) {
                if (checkIfWinningMove(newSquares, i, j, icon)) {
                    numberOfWinningMovesSetUp++;
                }
            }
        }
    }

    return numberOfWinningMovesSetUp;
}

calculateSurroundingCoordinates = (x, y, includeDiagonal) => {
    let surroundingCoordinates = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let xCoordinate = x + i;
        let yCoordinate = y + j;
        if ( xCoordinate < 0 || yCoordinate < 0 || xCoordinate > 2 || yCoordinate > 2 || (x === xCoordinate && y === yCoordinate) || ((Math.abs(i) === Math.abs(j)) && !includeDiagonal)) { 
          continue;
        }
        surroundingCoordinates.push([xCoordinate, yCoordinate]);
      }
    }

    return surroundingCoordinates;
}


