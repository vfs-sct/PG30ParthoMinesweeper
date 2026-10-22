import GameState from "../modules/gameState.js"
import GameScreen from "../modules/gameScreen.js"
import UserInput from "../modules/userInput.js";

class GameEngine {
    constructor(constructorId) {
        this.gameScreen = new GameScreen();
        this.gameState = new GameState(this.gameScreen);
        this.userInput = new UserInput(this.gameState);
    }
}

export default GameEngine;