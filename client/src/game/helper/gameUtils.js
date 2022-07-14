import { MdInsertChartOutlined } from "react-icons/md";

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
    console.log(squares);
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
    console.log(`Check if win move ${x} ${y}`);
    console.log(squares);
    console.log("_____");
    for (let i in squares) {
        for (let j in squares[i]) {
            console.log(squares[i][j]);
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

export const delay = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), duration);
    });
  }