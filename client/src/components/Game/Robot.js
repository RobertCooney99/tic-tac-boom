import { checkIfWinningMove, checkIfSetUpWinningMove } from 'shared/utils/helper/gameUtils.js';

class Robot {
    calculateMove = (board, bombInProgress, playerOneIsNext, playerOne, playerTwo) => {
        if (!playerOneIsNext && !bombInProgress) {
            const winningMoves = [];
            const gameSavingMoves = [];
            const setUpWinningMove = [];
            const blockOpponentSetUp = [];
            const otherMoves = [];
        
            for (let x = 0; x <= 2; x++) {
                for (let y = 0; y <= 2; y++) {
                    if (board[x][y]) {
                        continue;
                    }
            
                    if (checkIfWinningMove(board, x, y, playerTwo.emoji)) {
                        winningMoves.push([x,y]);
                    }
            
                    if (checkIfWinningMove(board, x, y, playerOne.emoji)) {
                        gameSavingMoves.push([x,y]);
                    }
        
                    const checkIfSetUpWinningMoveResult = checkIfSetUpWinningMove(board, x, y, playerTwo.emoji);
                    if (checkIfSetUpWinningMoveResult) {
                        setUpWinningMove.push([[x,y], checkIfSetUpWinningMoveResult]);
                    }
        
                    const checkIfBlockSetUpWinningMoveResult = checkIfSetUpWinningMove(board, x, y, playerOne.emoji);
                    if (checkIfBlockSetUpWinningMoveResult) {
                        blockOpponentSetUp.push([[x,y], checkIfBlockSetUpWinningMoveResult]);
                    }
        
                    otherMoves.push([x,y]);
                }
            }
        
            const setUpAndBlockWinningMove = this.mergeSetUpArrays(setUpWinningMove, blockOpponentSetUp);
        
            setUpWinningMove.sort(this.sortArrayBySecondColumnDesc);
            blockOpponentSetUp.sort(this.sortArrayBySecondColumnDesc);
            setUpAndBlockWinningMove.sort(this.sortArrayBySecondColumnDesc);
        
            if (winningMoves.length > 0 && (!this.robotMakesMistake(5) || !this.isMistakePossible(1, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves))) {
                const randomNumber = Math.floor(Math.random() * winningMoves.length);
                return {x: winningMoves[randomNumber][0], y: winningMoves[randomNumber][1]};
            }
    
            if (gameSavingMoves.length > 0 && (!this.robotMakesMistake(5) || !this.isMistakePossible(2, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves))) {
                const randomNumber = Math.floor(Math.random() * gameSavingMoves.length);
                return {x: gameSavingMoves[randomNumber][0], y: gameSavingMoves[randomNumber][1]};
            }
    
            if (setUpAndBlockWinningMove.length > 0 && (!this.robotMakesMistake(10) || !this.isMistakePossible(3, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves))) {
                const randomMove = this.selectRandomWeightedValue(setUpAndBlockWinningMove);
                return {x: randomMove[0][0], y: randomMove[0][1]};
            }
    
            if (setUpWinningMove.length > 0 && (!this.robotMakesMistake(15) || !this.isMistakePossible(4, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves))) {
                const randomMove = this.selectRandomWeightedValue(setUpWinningMove);
                return {x: randomMove[0][0], y: randomMove[0][1]};
            }
    
            if (blockOpponentSetUp.length > 0 && (!this.robotMakesMistake(15) || !this.isMistakePossible(5, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves))) {
                const randomMove = this.selectRandomWeightedValue(blockOpponentSetUp);
                return {x: randomMove[0][0], y: randomMove[0][1]};
            }
    
            if (otherMoves.length > 0) {
                const randomNumber = Math.floor(Math.random() * otherMoves.length);
                return {x: otherMoves[randomNumber][0], y: otherMoves[randomNumber][1]};
            }
        }
    }

    isMistakePossible = (priority, gameSavingMoves, setUpAndBlockWinningMove, setUpWinningMove, blockOpponentSetUp, otherMoves) => {
        for (let i = priority + 1; i <= 6; i++) {
            if ((i === 2) && (gameSavingMoves.length > 0)) {
                return true;
            }
            if ((i === 3) && (setUpAndBlockWinningMove.length > 0)) {
                return true;
            }
            if ((i === 4) && (setUpWinningMove.length > 0)) {
                return true;
            }
            if ((i === 5) && (blockOpponentSetUp.length > 0)) {
                return true;
            }
            if ((i === 6) && (otherMoves.length > 0)) {
                return true;
            }
        }
        return false;
    }

    selectRandomWeightedValue = (array, multiplier = 1) => {
        let weightedArray = [];
        for (let value of array) {
            for (let i = 0; i < (value[1] * multiplier); i++) {
                weightedArray.push(value);
            } 
        }
        const randomIndex = Math.floor(Math.random() * weightedArray.length);
        return weightedArray[randomIndex];
    }
    
    sortArrayBySecondColumnDesc = (a, b) => {
        return this.sortArrayBySecondColumn(a, b, false);
    }
    
    sortArrayBySecondColumn = (a, b, asc = true) => {
        const modifier = (asc) ? 1 : -1;
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] < b[1]) ? (-1 * modifier) : (1 * modifier);
        }
    }
    
    robotMakesMistake = (chance) => {
        const randomNumber = Math.floor(Math.random() * 100);
        return (randomNumber < chance);
    }

    mergeSetUpArrays = (a, b) => {
        let newArray = [];
        for (let i in a) {
          for (let j in b) {
                if ((a[i][0][0] === b[j][0][0]) && (a[i][0][1] === b[j][0][1])) {
                    newArray.push([a[i][0], (a[i][1] + b[j][1])]);
                }
            }
        }
        return newArray;
    }
};

export default Robot;