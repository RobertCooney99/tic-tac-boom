import { calculateWinner, calculateSurroundingCoordinates, compareArrays, removeDuplicatesFromArray } from '../../utils/helper/gameUtils';
import { delay } from '../../utils/delay';

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
                if (robot) {
                    status = `${playerOneIsNext ? "Your" : "Robot's"} turn`;
                } else {
                    status = `Player ${playerOneIsNext ? playerOne.getEmoji() : playerTwo.getEmoji()}'s turn...`;
                }
            }
        }
        return status;
    };

    handleClick = (x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress) => {
        console.log("Handling click at: " + x + "," + y);
        // props.socket.emit('boardClick', {xCoordinate: x, yCoordinate: y});
    
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

export default GameManager;