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
        const gameReset = document.getElementById("game-reset");
        const gameBoard = document.getElementById("game-board-container");

        beginner.addEventListener("click", this.handleMenuClick.bind(this));
        intermediate.addEventListener("click", this.handleMenuClick.bind(this));
        expert.addEventListener("click", this.handleMenuClick.bind(this));
        gameExit.addEventListener("click", this.handleMenuClick.bind(this));
        gameReset.addEventListener("click", this.handleMenuClick.bind(this));

        gameBoard.addEventListener("click", this.handleClick.bind(this));
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

            case "game-reset":
                
                const currentState = this.gameState.getState();
                this.gameState.popState();

                // reset with existing state
                this.gameState.pushState({ screen: currentState.screen, difficulty: currentState.difficulty });
                break;

        }
    }

    handleClick(event) {
        const cell = event.target.closest("td");
        if (cell) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            alert("row" + row + " col" + col);
        }

    }


}

export default UserInput;