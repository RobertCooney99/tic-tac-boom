import GameManager from "./GameManager";
import { calculateWinner } from '../../utils/helper/gameUtils';

class SoloGameManager extends GameManager {
    constructor(robot) {
        super();
        this.robot = robot;
        this.timeouts = [];
    }

    calcStatus = (bombInProgress, board, playerOneIsNext) => {
        let status;
        if (bombInProgress) {
            status = 'BOOM!';
        } else {
            const winner = calculateWinner(board);
            if (winner) {
                status = `${winner} wins!`;
            } else {
                status = `${playerOneIsNext ? "Your" : "Robot's"} turn`;
            }
        }
        return status;
    };

    resetGame = (bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress) => {
        if (!bombInProgress) {
            setBoard([[null, null, null], [null, null, null], [null, null, null]]);
            setPlayerOneIsNext(true);
            setBombInProgress(false);
        }
        for (let timeout of this.timeouts) {
            clearTimeout(timeout);
        }
    }

    robotMakeMove = (board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress) => {
        let {x, y} = this.robot.calculateMove(board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress);
        this.timeouts.push(setTimeout(() => {
            this.handleClick(x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress);
        }, 750));
    }
}

export default SoloGameManager;