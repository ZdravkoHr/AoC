const fs = require('fs');
const path = require('path');
const { start } = require('repl');
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

	lines.forEach(line => {
		checkLine(line, bottom);
	});

	return countItems(bottom, value => value > 1);
}

function checkLine(line, bottom) {
	const { x1, y1, x2, y2 } = line;

	if (x1 !== x2 && y1 !== y2) {
		const startY = Math.min(y1, y2);
		const endY = Math.max(y1, y2);
		const startX = startY === y1 ? x1 : x2;
		const endX = endY === y1 ? x1 : x2;

		diagonalMark(bottom, startX, startY, endX, endY);
		return;
	}

	if (y1 === y2) {
		startPoint = Math.min(x1, x2);
		endPoint = Math.max(x1, x2);
		constantPoint = y1;
		direction = 'x';
	} else if (x1 === x2) {
		startPoint = Math.min(y1, y2);
		endPoint = Math.max(y1, y2);
		constantPoint = x1;
		direction = 'y';
	}

	straightMark(bottom, startPoint, endPoint, constantPoint, direction);
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

function diagonalMark(board, startX, startY, endX, endY) {
	while (startY <= endY) {
		board[startY] = board[startY] || [];
		board[startY][startX] = (board[startY][startX] || 0) + 1;
		startY++;
		startX += startX > endX ? -1 : 1;
	}
}

function straightMark(board, startPoint, endPoint, constantPoint, direction) {
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
}

function filterLine(line) {
	const { x1, y1, x2, y2 } = line;
	const xDiff = Math.abs(x1 - x2);
	const yDiff = Math.abs(y1 - y2);

	return x1 === x2 || y1 === y2 || xDiff === yDiff;
}

function getLines(input) {
	console.log(5);
	return input
		.split('\n')
		.map(line => {
			const [firstCoords, secondCoords] = line.split(' -> ');
			const [x1, y1] = obtainCoords(firstCoords);
			const [x2, y2] = obtainCoords(secondCoords);

			return { x1, y1, x2, y2 };
		})
		.filter(filterLine);
}

function obtainCoords(coords) {
	return coords.split(',').map(coord => Number(coord));
}

console.log(solve(input));
