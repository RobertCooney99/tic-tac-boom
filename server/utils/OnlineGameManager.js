import GameManager from 'shared/GameManager.js';
import { calculateWinner } from 'shared/utils/helper/gameUtils.js';

class OnlineGameManager extends GameManager {
    constructor() {
        super();
    };

    calcStatus = () => {
        let status;
        if (this.bombInProgress) {
            this.setStatus("BOOM!", "BOOM!");
        } else {
            const winner = calculateWinner(this.board);
            if (winner) {
                if (winner === this.playerOne.getEmoji()) {
                    this.setStatus("YOU WIN", "YOU LOSE");
                } else if (winner === this.playerTwo.getEmoji()) {
                    this.setStatus("YOU LOSE", "YOU WIN");
                }
            } else {
                if (this.playerOneIsNext) {
                    this.setStatus("YOUR TURN", "OPPONENT'S TURN");
                } else {
                    this.setStatus("OPPONENT'S TURN", "YOUR TURN");
                }
            }
        }
    };

}

export default OnlineGameManager;