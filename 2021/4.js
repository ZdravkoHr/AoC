const fs = require('fs');
const path = require('path');
// let input;

// try {
// 	const filePath = path.join(__dirname, './', '4.txt');
// 	const data = fs.readFileSync(filePath, 'utf8');
// 	input = data;
// } catch (err) {
// 	console.error(err);
// }

function solve(input) {
	let [numbers, ...boards] = input.split('\n\n');

	numbers = numbers.split(',').map(num => Number(num));
	boards = makeBoards(boards);

	const marked = Array.from(new Array(boards.length), (_, i) => {
		return Array.from(new Array(5), () => [false, false, false, false, false]);
	});

	let win = false;
	let winBoard, winNumber;

	numbers: for (const number of numbers) {
		for (const boardIndex in boards) {
			const board = boards[boardIndex];
			const hasWon = markAndCheck(board, boardIndex, number, marked);

			if (hasWon) {
				win = true;
				winNumber = number;
				winBoard = boardIndex;
				break numbers;
			}
		}
	}

	if (!win) return 0;

	let unmarkedScore = 0;

	for (const i in marked[winBoard]) {
		const row = marked[winBoard][i];
		for (const j in row) {
			const col = row[j];
			if (!col) {
				unmarkedScore += boards[winBoard][i][j];
			}
		}
	}

	return unmarkedScore * winNumber;
}

function checkForWin(board, boardIndex, marked, row, col) {
	let horizontalUnmarked = false;
	let verticalUnmarked = false;
	for (let i = 0; i < 5; i++) {
		if (!marked[+boardIndex][+row][+i]) {
			horizontalUnmarked = true;
			break;
		}
	}

	if (!horizontalUnmarked) return true;

	for (let i = 0; i < 5; i++) {
		if (!marked[boardIndex][i][col]) {
			verticalUnmarked = true;
			break;
		}
	}

	if (!verticalUnmarked) return true;

	return false;
}

function markAndCheck(board, boardIndex, number, marked) {
	let win = false;

	row: for (const i in board) {
		const row = board[i];

		for (const j in row) {
			const col = row[j];

			if (col === number) {
				marked[boardIndex][i][j] = true;
				const hasWon = checkForWin(board, boardIndex, marked, i, j);
				if (hasWon) {
					win = true;
					break row;
				}
			}
		}
	}

	return win;
}

function makeBoards(boards) {
	boards = boards.map(board => {
		const rows = board.split('\n').map(row => {
			row = row
				.split(' ')
				.filter(Boolean)
				.map(num => Number(num));

			return row;
		});

		return rows;
	});

	return boards;
}

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

console.log(solve(input));
