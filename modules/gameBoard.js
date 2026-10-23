class GameBoard {
	constructor(rows, cols, bombs)
	{
		this.rows = rows;
		this.cols = cols;
		this.bombs = bombs;

		this.createBoard();

	}

	createBoard() {
		const board = [];
		for (let rIdx = 0; rIdx < this.rows; rIdx++)
		{
			let row = [];
			for (let cIdx = 0; cIdx < this.cols; cIdx++) {
				row.push(null);
			}
			board.push(row);
		}
		return board;
	}

	renderBoard() {
		const gameBoardContainer = document.getElementById("game-board-container");
		gameBoardContainer.innerHTML = '';
		const table = document.createElement("table");

		for (let rIdx = 0; rIdx < this.rows; ++rIdx) {
			const row = document.createElement("tr");
			for (let cIdx = 0; cIdx < this.rows; ++cIdx) {
				const cell = document.createElement("td");
				const cellButton = document.createElement("button");
				cellButton.classList.add("board-button");
				cell.dataset.row = rIdx;
				cell.dataset.col = cIdx;
				cell.appendChild(cellButton);
				row.appendChild(cell);
			}
			table.appendChild(row);
		}
		gameBoardContainer.appendChild(table);
	}

	
}

export default GameBoard;