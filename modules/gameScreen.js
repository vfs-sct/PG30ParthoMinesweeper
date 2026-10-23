import GameBoard from "./gameBoard.js";

class GameScreen {
    constructor() {
        this.gameBoard = null;
    }

    renderScreen(screen, difficulty)
    {
        const header = document.getElementsByClassName("game-header")[0];
        const mainMenu = document.getElementsByClassName("main-menu")[0];
        const gameView = document.getElementsByClassName("game-view")[0];
        switch (screen) {
            case "menu":
                header.classList.add("hidden");
                mainMenu.classList.remove("hidden");
                gameView.classList.add("hidden");
                break;
            case "game":
                header.classList.remove("hidden");
                mainMenu.classList.add("hidden");
                gameView.classList.remove("hidden");

                switch (difficulty) {
                    case "beginner":
                        this.renderBoardScreen(9, 9, 10);                        
                        break;
                    case "intermediate":
                        this.renderBoardScreen(16, 16, 40);
                        break;
                    case "expert":
                        this.renderBoardScreen(30, 16, 99);
                        break;
                }

                
                
                break;
        }
    }

    renderBoardScreen(rows, cols, bombs) {
        this.gameBoard = new GameBoard(rows, cols, bombs)
        this.gameBoard.renderBoard();
    }

}

export default GameScreen;
