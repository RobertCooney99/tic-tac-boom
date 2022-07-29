import { calculateWinner, calculateSurroundingCoordinates, compareArrays, removeDuplicatesFromArray } from '../../utils/helper/gameUtils.js';
import { delay } from '../../utils/delay.js';

import Player from './Player.js';
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
};

export default GameManager;