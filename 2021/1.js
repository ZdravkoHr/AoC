const fs = require('fs');
const path = require('path');
let input;

try {
	const filePath = path.join(__dirname, './', '1.txt');
	const data = fs.readFileSync(filePath, 'utf8');
	input = data;
} catch (err) {
	console.error(err);
}

function solve(input) {
	const numbers = input.split('\n').map(item => Number(item));
	let prev = Infinity;
	let increments = 0;

	for (let i = 0; i < numbers.length; i++) {
		if (i + 2 === numbers.length) break;

		const sum = numbers[i] + numbers[i + 1] + numbers[i + 2];
		increments += sum > prev ? 1 : 0;
		prev = sum;
	}

	return increments;
}

console.log(solve(input));
