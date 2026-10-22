class GameState {

    // State is responsible for changing the game screen
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.state = []        
        this.initState();
    }

    initState() {
        this.state.push({screen: "menu", difficulty: "beginner"});
    }

    getState() {
        return this.state[this.state.length - 1];
    }

    pushState(newState) {
        this.state.push(newState);
        this.handleStateChange()
    }

    popState() {
        this.state.pop();
        this.handleStateChange()
    }

    handleStateChange() {
        let currentState = this.getState();
        switch (currentState.screen)
        {
            case "menu":
                this.gameScreen.renderScreen("menu");
                break;
            case "game":
                this.gameScreen.renderScreen("game");
                break;
        }

    }
}

export default GameState;