const fs = require('fs');
const path = require('path');
let input;

try {
	const filePath = path.join(__dirname, './', '5.txt');
	const data = fs.readFileSync(filePath, 'utf8');
	input = data;
} catch (err) {
	console.error(err);
}

function solve(input) {
	const bottom = [];
	const lines = getLines(input);
	const markPoint = getMarker(bottom);

	lines.forEach(line => {
		const { x1, y1, x2, y2 } = line;
		let startPoint, endPoint, constantPoint, direction;

		if (y1 === y2) {
			startPoint = Math.min(x1, x2);
			endPoint = Math.max(x1, x2);
			constantPoint = y1;
			direction = 'x';
		} else {
			startPoint = Math.min(y1, y2);
			endPoint = Math.max(y1, y2);
			constantPoint = x1;
			direction = 'y';
		}

		markPoint(startPoint, endPoint, constantPoint, direction);
	});

	return countItems(bottom, value => value > 1);
}

function countItems(items, cb) {
	let count = 0;

	items.forEach(item => {
		item.forEach(column => {
			if (cb(column)) count++;
		});
	});

	return count;
}

function getMarker(board) {
	return function (startPoint, endPoint, constantPoint, direction) {
		if (direction === 'x') {
			board[constantPoint] = board[constantPoint] || [];

			for (let j = startPoint; j <= endPoint; j++) {
				board[constantPoint][j] = (board[constantPoint][j] || 0) + 1;
			}

			return;
		}

		for (let i = startPoint; i <= endPoint; i++) {
			board[i] = board[i] || [];
			board[i][constantPoint] = (board[i][constantPoint] || 0) + 1;
		}
	};
}

function getLines(input) {
	return input
		.split('\n')
		.map(line => {
			const [firstCoords, secondCoords] = line.split(' -> ');
			const [x1, y1] = obtainCoords(firstCoords);
			const [x2, y2] = obtainCoords(secondCoords);

			return { x1, y1, x2, y2 };
		})
		.filter(line => line.x1 === line.x2 || line.y1 === line.y2);
}

function obtainCoords(coords) {
	return coords.split(',').map(coord => Number(coord));
}

console.log(solve(input));
