const fs = require('fs');
const path = require('path');
let input;

try {
	const filePath = path.join(__dirname, './', 'day5.txt');
	const data = fs.readFileSync(filePath, 'utf8');
	input = data;
} catch (err) {
	console.error(err);
}

function solve(input) {
	const seats = input.split('\n');

	const ids = seats.map(seat => {
		const rowStr = seat.slice(0, 7);
		const colStr = seat.slice(7);
		const rowID = binarySearch(rowStr, 'B', 'F', 128);
		const colID = binarySearch(colStr, 'R', 'L', 8);
		return rowID * 8 + colID;
	});

	return (
		ids
			.sort((a, b) => a - b)
			.slice(1, -1)
			.find((id, index, self) => {
				if (id + 1 !== self[index + 1]) {
					return true;
				}
				return false;
			}) + 1
	);
}

function binarySearch(str, topSymbol, bottomSymbol, n) {
	let low = 0;
	let high = n;

	for (char of str) {
		const m = Math.floor((low + high) / 2);
		if (char === topSymbol) {
			low = m;
		} else if (char === bottomSymbol) {
			high = m;
		}
	}

	return low;
}

console.log(solve(input));
