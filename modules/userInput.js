class UserInput {
    constructor(gameState) {
        this.gameState = gameState;
        this.addEventListeners();
    }

    addEventListeners()
    {
        const beginner = document.getElementById("beginner");
        const intermediate = document.getElementById("intermediate");
        const expert = document.getElementById("expert");
        const gameExit = document.getElementById("game-exit");

        beginner.addEventListener("click", this.handleMenuClick.bind(this));
        intermediate.addEventListener("click", this.handleMenuClick.bind(this));
        expert.addEventListener("click", this.handleMenuClick.bind(this));
        gameExit.addEventListener("click", this.handleMenuClick.bind(this));
    }

    handleMenuClick(event) {
        const id = event.target.id;

        switch (id) {
            case "beginner":
                this.gameState.pushState({ screen: "game", difficulty: "beginner" });                
                break;

            case "intermediate":
                this.gameState.pushState({ screen: "game", difficulty: "intermediate" });
                break;

            case "expert":
                this.gameState.pushState({ screen: "game", difficulty: "expert" });
                break;

            case "game-exit":
                this.gameState.popState();
                break;

        }
    }
}

export default UserInput;