import GameManager from 'shared/GameManager.js';
import { calculateWinner } from 'shared/utils/helper/gameUtils.js';
import { delay } from 'shared/utils/delay.js';

class SoloGameManager extends GameManager {
    constructor(robot) {
        super();
        this.robot = robot;
        this.timeouts = [];
    }

    calcStatus = () => {
        let status;
        if (this.bombInProgress) {
            status = 'BOOM!';
        } else {
            const winner = calculateWinner(this.board);
            if (winner) {
                status = `${winner} wins!`;
            } else {
                status = `${this.playerOneIsNext ? "Your" : "Robot's"} turn`;
            }
        }
        this.setStatus(status);
    };

    resetGame = () => {
        if (!this.bombInProgress) {
            this.updateBoard([[null, null, null], [null, null, null], [null, null, null]]);
            this.playerOneIsNext = true;
            this.bombInProgress = false;
            for (let timeout of this.timeouts) {
                clearTimeout(timeout);
            }
            this.calcStatus();
        }
    }

    handleClick = (x,y,robot) => {
        console.log("Handling click at: " + x + "," + y);
        if (!this.playerOneIsNext && !robot) {
            return;
        }
    
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
            this.robotMakeMove();
        } else {
            this.playerOneIsNext = !this.playerOneIsNext;
            this.bombInProgress = true;
            this.calcStatus(this.board);
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber === 1) {
                this.plantBigBomb(x,y,this.robotMakeMove)
            } else {
                this.plantSmallBomb(x,y,this.robotMakeMove);
            }
        }
    };

    plantSmallBomb = (x,y,robotMakeMove) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x, y, '🧨'))
          .then(() => delay(400))
          .then(() => this.explodeBomb(x, y))
          .then(() => delay(300))
          .then(() => this.spreadBombToSurroundingArea(x, y))
          .then(() => delay(300))
          .then(() => this.cleanUpBomb(x, y))
          .then(() => robotMakeMove());
    }
    
    plantBigBomb = (x,y,robotMakeMove) => {
        Promise.resolve()
          .then(() => this.placeBombOnBoard(x, y, '💣'))
          .then(() => delay(500))
          .then(() => this.explodeBomb(x, y))
          .then(() => delay(250))
          .then(() => this.spreadBigBombToSurroundingArea([[x, y]], [[x, y]]))
          .then(() => delay(250))
          .then(() => this.clearBoardFromExplosion())
          .then(() => robotMakeMove());
    }

    robotMakeMove = () => {
        let robotMove = this.robot.calculateMove(this.board, this.bombInProgress, this.playerOneIsNext, this.playerOne, this.playerTwo);
        this.timeouts.push(setTimeout(() => {
            this.handleClick(robotMove.x, robotMove.y, true);
        }, 750));
    }
}

export default SoloGameManager;