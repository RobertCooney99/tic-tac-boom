export const removeDuplicatesFromArray = (arr) => {
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

export const compareArrays = (a, b) => {
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

export const calculateWinner = (squares) => {
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

export const checkIfWinningMove = (squares, x, y, icon) => {
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

export const checkIfSetUpWinningMove = (squares, x, y, icon) => {
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

// export const delay = (duration) => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(), duration);
//     });
// }

export const calculateSurroundingCoordinates = (x, y, includeDiagonal) => {
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