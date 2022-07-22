import { calculateWinner } from '../../utils/helper/gameUtils';

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

    handleClick = (x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,plantBigBomb,plantSmallBomb) => {
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
                plantBigBomb(x,y);
            } else {
                plantSmallBomb(x,y);
            }
        }
    };
};

export default GameManager;