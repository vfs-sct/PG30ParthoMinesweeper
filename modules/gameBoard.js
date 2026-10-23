class GameBoard {
	constructor(rows, cols, bombs)
	{
		this.rows = rows;
		this.cols = cols;
		this.bombs = bombs;

		this.board = this.createBoard();
		// This holds the state of the player. 
		this.status = "ready"; // ready | playing | won | lost
		this.flagsPlaced = 0;
		this.revealedCount = 0;
		this.seconds = 0;
		this.timerId = null;
		this.faces = {
			ready: "😀",
			playing: "😀",
			won: "😎",
			lost: "😵"
		};

	}

	// Create board called when the game is created
	createBoard() {
		const board = [];
		for (let rIdx = 0; rIdx < this.rows; rIdx++)
		{
			let row = [];
			for (let cIdx = 0; cIdx < this.cols; cIdx++) {
				// We will push the board cell state. Each cell will have this state

				// The cell state is as follows:
				// mine: it is a mine or not
				// revealed: has the cell been revealed
				// flagged: user has marked it as flagged
				// exploded: it had a mine and user clicked it which results in explosion
				// adjacent: the number around mine (1,2,3,4, etc)
				row.push({mine: false, revealed: false, flagged: false, exploded: false, adjacent: 0});
			}
			board.push(row);
		}
		return board;
	}

	createCellElement(cell) {
		const lost = this.status === "lost";

		// a safe cell or a mine cell is revealed
		if (cell.revealed || (lost && cell.mine && !cell.flagged)) {

			// create cell content div to populate
			const cellContent = document.createElement("div");

			// add a button
			cellContent.classList.add("board-button", "board-button-border");

			// if cell is a mine
			if (cell.mine) {

				cellContent.textContent = "💣";
				if (cell.exploded) {
					// add cell with bomb and background as red
					cellContent.classList.add("exploded");
				}
				else if (cell.adjacent > 0) { // this means the numbers adjacent to bomb, for e.g, 1,2,3,4,etc
					cellContent.textContent = cell.adjacent;
					// we paint the exact color
					cellContent.classList.add("num-" + cell.adjacent);
				}
			}
			return cellContent;
		}

		const cellButton = document.createElement("button");
		cellButton.classList.add("board-button");

		if (cell.flagged) {
			// if the flagged cell was not a mine we show cross or else flag
			cellButton.textContent = lost && !cell.mine ? "❌" : "🚩";
		}

		return cellButton;
	}

	getNeighbours(row, col) {
		const result = [];
		// We need to get neighbours of the row, col
		// this would be total 3x3 cells which is as follows
		// row -1, col - 1
		// row -1, col + 0
		// row - 1, col + 1
		//
		// row + 0, col - 1
		// row  + 0, col + 0 // this is the cell itself
		// row + 0, col + 1
		//
		// row +1, col - 1
		// row +1, col + 0
		// row +1, col + 1

		for (let rowDelta = -1; rowDelta <= 1; ++rowDelta) {
			for (let colDelta = -1; colDelta <= 1; ++colDelta) {
				if (rowDelta == 0 && colDelta == 0) {
					// it is the same row col as input so we skip it
					continue;
				}

				// Got neighbours
				const neighbourRow = row + rowDelta;
				const neighbourCol = col + colDelta;

				// push neighbours in result list if it is rows and cols are in range
				if (neighbourRow >= 0 && neighbourRow < this.rows && neighbourCol >= 0 && neighbourCol < this.cols) {
					result.push([neighbourRow, neighbourCol]);
				}
			}
		}

		return result;
	}

	// placing mine logic after first click
	placeMines(safeRow, safeCol) {
		let placed = 0;

		// We have to keep trying to place bomb till we don't reach all bomb count
		while (placed < this.bombs) {
			const bombRow = Math.floor(Math.random() * this.rows);
			const bombCol = Math.floor(Math.random() * this.cols);

			// Don't put mine if cell already has mine or chosen cell is near clicked cell
			const isNearFirstClick = Math.abs(bombRow - safeRow) <= 1 && Math.abs(bombCol - safeCol) <= 1;
			if (this.board[bombRow][bombCol].mine || isNearFirstClick) {

				// skip the loop and try again
				continue;
			}

			// Safe to place mine
			this.board[bombRow][bombCol].mine = true;

			// a bomb has been placed
			placed++;
		}

		// Once the bombs are placed, we need to mark the adjacent cells with numbers
		for (let rIdx = 0; rIdx < this.rows; ++rIdx) {
			for (let cIdx = 0; cIdx < this.cols; ++cIdx) {
				// We are simply adding up the neighbours of the bomb cell and adding them in the adjacent cell
				this.board[bombRow][bombCol].adjacent = this.getNeighbours(bombRow, bombCol).filter(([neighbourRow, neighbourCol]) => this.board[neighbourRow][neighbourCol].mine).length
			}
		}
	}

	// This will be called everytime the button is clicked in board cell
	reveal(row, col)
	{

		if (this.status == "won" || this.status == "lost") {
			return;
		}

		const cell = this.board[row][col];

		// If the cell has been revealed or has been flagged, don't do anything on click
		if (cell.revealed || cell.flagged)
		{
			return;
		}

		// Player just starting the game
		if (this.status == "ready") {

			// place mines
			this.placeMines(row, col);

			// change status to playing
			this.status = "playing";

			// start the timer
			this.startTimer();
		}

	}

	// Timer logic
	startTimer() {
		this.stopTimer();
		this.timerId = setInterval(() => {
			this.seconds = Math.min(this.seconds + 1, 999);
			this.updateHud();
		}, 1000);
	}

	stopTimer() {
		// simply stop the timer when the player has not started playing.
		if (this.timerId !== null) {
			clearInterval(this.timerId);
			this.timerId = null;
		}

	}


	// All rendering logic

	// Found logic here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
	formatCounter(num) {
		if (num < 0) {
			return "-" + String(Math.min(-num, 99)).padStart(2, "0");
			return String(Math.min(num, 999)).padStart(3, "0")
		}
		
	}

	// HUD items like mine counter, timer and button face updated here
	updateHud() {
		let mineCounter = document.getElementById("mine-counter");
		
		mineCounter.textContent = this.formatCounter(this.bombs - this.flagsPlaced);

		let gameTimer = document.getElementById("game-timer");

		gameTimer.textContent = this.formatCounter(this.seconds);

		document.getElementById("game-reset").textContent = this.faces[this.status];
	}

	// Actual render board logic
	renderBoard() {
		const gameBoardContainer = document.getElementById("game-board-container");
		gameBoardContainer.innerHTML = '';
		const table = document.createElement("table");

		for (let rIdx = 0; rIdx < this.rows; ++rIdx) {
			const row = document.createElement("tr");
			for (let cIdx = 0; cIdx < this.cols; ++cIdx) {
				const cell = document.createElement("td");
				cell.dataset.row = rIdx;
				cell.dataset.col = cIdx;
				cell.appendChild(this.createCellElement(this.board[rIdx][cIdx]));
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		gameBoardContainer.appendChild(table);
	}

	
}

export default GameBoard;