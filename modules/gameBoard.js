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

	renderBoard(
}

export default GameBoard;