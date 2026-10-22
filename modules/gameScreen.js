class GameScreen {
    constructor() {
    }

    renderScreen(screen)
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

                //load board
                break;
        }
    }

    loadBoard()
    {
        const gameBoardContainer = document.getElementById("game-board-container");
        
    }

    generateBoard() {

    }

    
    
}

export default GameScreen;
