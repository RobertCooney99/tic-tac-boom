class GameManager {
    resetGame = (bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress) => {
        if (!bombInProgress) {
            setBoard([[null, null, null], [null, null, null], [null, null, null]]);
            setPlayerOneIsNext(true);
            setBombInProgress(false);
        }
    };

    calcStatus = (bombInProgress, board, playerOneIsNext, playerOne, playerTwo) => {
        let status;
        if (bombInProgress) {
            status = 'BOOM!';
        } else {
            const winner = calculateWinner(board);
            if (winner) {
                status = `${winner} wins!`;
            } else {
                status = `Player ${playerOneIsNext ? playerOne.getEmoji() : playerTwo.getEmoji()}'s turn...`;
            }
        }
        return status;
    };

    handleClick = (x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress) => {
        console.log("Handling click at: " + x + "," + y);
    
        if (calculateWinner(board) || board[x][y] || bombInProgress) {
            return;
        }
    
        const randomNumber = Math.floor(Math.random() * 4);
        let bomb;
        if (randomNumber === 1) {
            bomb = true;
        }
    
        if (!bomb) {
            const current = board.map((x) => x);
            current[x][y] = playerOneIsNext ? playerOne.getEmoji() : playerTwo.getEmoji();
            setBoard(current);
            setPlayerOneIsNext(!playerOneIsNext);
        } else {
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber === 1) {
                this.plantBigBomb(x,y,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext);
            } else {
                this.plantSmallBomb(x,y,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext);
            }
        }
    };

    plantSmallBomb = (x,y,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x,y,'🧨',board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext))
          .then(() => delay(400))
          .then(() => this.explodeBomb(x,y,board,setBoard))
          .then(() => delay(300))
          .then(() => this.spreadBombToSurroundingArea(x,y,board,setBoard))
          .then(() => delay(300))
          .then(() => this.cleanUpBomb(x,y,board,setBoard,setBombInProgress));
    }
    
    plantBigBomb = (x,y,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x, y, '💣', board, setBoard, setPlayerOneIsNext, setBombInProgress, playerOneIsNext))
          .then(() => delay(500))
          .then(() => this.explodeBomb(x,y,board,setBoard))
          .then(() => delay(250))
          .then(() => this.spreadBigBombToSurroundingArea([[x,y]], [[x,y]], board, setBoard, setPlayerOneIsNext, setBombInProgress, playerOneIsNext))
          .then(() => delay(250))
          .then(() => this.clearBoardFromExplosion(setBoard, setBombInProgress));
    }

    placeBombOnBoard = (x,y,bomb,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext) => {
        const current = board.map((x) => x);
        current[x][y] = bomb;
        setBoard(current);
        setPlayerOneIsNext(!playerOneIsNext);
        setBombInProgress(true);
    }

    explodeBomb = (x,y,board,setBoard) => {
        let newSquares = board.map((x) => x);
        newSquares[x][y] = '💥';
        setBoard(newSquares);
    }

    spreadBombToSurroundingArea = (x,y,board,setBoard) => {
        const surroundingCoordinates = calculateSurroundingCoordinates(x,y,false);
        const newSquares = board.map((x) => x);
        for (let coordinates of surroundingCoordinates) {
            newSquares[coordinates[0]][coordinates[1]] = '💥';
        }
        console.log(newSquares);
        setBoard(newSquares);
    }
    
    spreadBigBombToSurroundingArea = (coordinatesToExplode, alreadyExplodedSquares, board, setBoard, setPlayerOneIsNext, setBombInProgress, playerOneIsNext) => {
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
    
            const newSquares = board.map((x) => x);
            for (let coordinates of squaresToExplode) {
                newSquares[coordinates[0]][coordinates[1]] = '💥';
                alreadyExplodedSquares.push([coordinates[0],coordinates[1]]);
            }
            setBoard(newSquares);
            return Promise.resolve().then(() => delay(250)).then(() => this.spreadBigBombToSurroundingArea(squaresToExplode, alreadyExplodedSquares,board,setBoard,setPlayerOneIsNext,setBombInProgress,playerOneIsNext));
        }
    }
    
    cleanUpBomb = (x,y,board,setBoard,setBombInProgress) => {
        const surroundingCoordinates = calculateSurroundingCoordinates(x,y,false);
        let newSquares = board.map((x) => x);
        newSquares[x][y] = null;
        for (let coordinates of surroundingCoordinates) {
            newSquares[coordinates[0]][coordinates[1]] = null;
        }
        setBoard(newSquares);
        setBombInProgress(false);
    }
    
    clearBoardFromExplosion = (setBoard, setBombInProgress) => {
        const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
        setBoard(newSquares);
        setBombInProgress(false);
    }
};

removeDuplicatesFromArray = (arr) => {
    let deduplicatedArray = [];
    const arrayLength = arr.length;
    let valuesFound = {};
    for(let i = 0; i < arrayLength; i++) {
        let valueAsString = JSON.stringify(arr[i]);
        if(valuesFound[valueAsString]) {
          continue;
        }
        valuesFound[valueAsString] = true;
        deduplicatedArray.push(arr[i]);
    }
    return deduplicatedArray;
}

compareArrays = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i in a) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
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


