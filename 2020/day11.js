const fs = require('fs');

const input = fs.readFileSync('./day11.txt', 'utf-8').split('\n');
function solve(input) {
	let matrix = extractMatrix(input);
	let changesMade = true;
	while (changesMade) {
		const result = [];
		let innerDetect = false;
		matrix.forEach((row, i) => {
			const newRow = [];
			row.forEach((col, j) => {
				if (col === '.') {
					newRow.push(col);
				} else {
					const visibleOccupiedSeats = getVisibleOccupiedSeats(matrix, i, j);
					if (col === 'L' && !visibleOccupiedSeats) {
						newRow.push('#');
						innerDetect = true;
					} else if (col === '#' && visibleOccupiedSeats >= 5) {
						newRow.push('L');
						innerDetect = true;
					} else {
						newRow.push(col);
					}
				}
			});

			result.push(newRow);
			changesMade = innerDetect;
		});
		matrix = result;
		// matrix.forEach(row => console.log(row.join('')));
		// console.log('\n\n');
	}

	//matrix.forEach(row => console.log(row.join('')));
	return matrix.reduce((a, b) => {
		return a + b.filter(char => char === '#').length;
	}, 0);
}

function extractMatrix(input) {
	return Array.from({ length: input.length }, (_, i) =>
		input[i].split('').filter(char => char !== '\r')
	);
}

function getOccupiedAdjacents(matrix, i, j) {
	let count = 0;

	for (let row = i - 1; row <= i + 1; row++) {
		if (row < 0 || row >= matrix.length) continue;
		for (let col = j - 1; col <= j + 1; col++) {
			if (row === i && col === j) continue;
			let current = matrix[row][col];

			if (current === '#') count++;
		}
	}

	return count;
}

function getVisibleOccupiedSeats(matrix, i, j) {
	let lD_up = false;
	for (
		let row = i - 1, passed = 1;
		row >= 0 && !lD_up && passed < matrix[row].length;
		row--
	) {
		if (matrix[row][j - passed] === '#') {
			lD_up = true;
		} else if (matrix[row][j - passed] === 'L') {
			break;
		}

		passed++;
	}

	let c_up = false;

	for (let row = i - 1; row >= 0 && !c_up; row--) {
		if (matrix[row][j] === '#') {
			c_up = true;
		} else if (matrix[row][j] === 'L') {
			break;
		}
	}

	let rD_up = false;

	for (
		let row = i - 1, passed = 1;
		row >= 0 && !rD_up && passed < matrix[row].length;
		row--
	) {
		if (matrix[row][j + passed] === '#') {
			rD_up = true;
		} else if (matrix[row][j + passed] === 'L') {
			break;
		}

		passed++;
	}

	let lD_down = false;
	for (
		let row = i + 1, passed = 1;
		row < matrix.length && !lD_down && j - passed >= 0;
		row++
	) {
		if (matrix[row][j - passed] === '#') {
			lD_down = true;
		} else if (matrix[row][j - passed] === 'L') {
			break;
		}
		passed++;
	}

	let c_down = false;

	for (let row = i + 1; row < matrix.length && !c_down; row++) {
		if (matrix[row][j] === '#') {
			c_down = true;
		} else if (matrix[row][j] === 'L') {
			break;
		}
	}

	let rD_down = false;

	for (
		let row = i + 1, passed = 1;
		row < matrix.length && !rD_down && passed < matrix[row].length;
		row++
	) {
		if (matrix[row][j + passed] === '#') {
			rD_down = true;
		} else if (matrix[row][j + passed] === 'L') {
			break;
		}

		passed++;
	}

	let l = false;
	for (let col = j - 1; col >= 0; col--) {
		if (matrix[i][col] === '#') {
			l = true;
		} else if (matrix[i][col] === 'L') {
			break;
		}
	}

	let r = false;
	for (let col = j + 1; col < matrix[i].length; col++) {
		if (matrix[i][col] === '#') {
			r = true;
		} else if (matrix[i][col] === 'L') {
			break;
		}
	}

	return lD_up + c_up + rD_up + lD_down + c_down + rD_down + l + r;
}

console.log(solve(input));
