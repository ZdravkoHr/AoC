const fs = require('fs');

const input = fs.readFileSync('./day9.txt', 'utf-8').split('\n').map(Number);

function solve(input, preambleSize) {
	const preamble = input.slice(0, preambleSize);
	const rest = input.slice(preambleSize);
	let invalidNumber;

	for (const number of rest) {
		if (!isValidSum(preamble, rest, number)) {
			invalidNumber = number;
			break;
		}

		preamble.shift();
		preamble.push(number);
	}

	const rangeIndexes = foundRangeIndexes(input, invalidNumber);
	const sortedRange = input
		.slice(rangeIndexes[0], rangeIndexes[1])
		.sort((a, b) => a - b);
	return sortedRange[0] + sortedRange.pop();
}

function foundRangeIndexes(input, invalidNumber) {
	let sum = 0;
	let startIndex = 0;

	for (let i = 0; i < input.length; i++) {
		while (sum > invalidNumber && startIndex < i) {
			sum -= input[startIndex];
			startIndex++;
		}

		if (sum === invalidNumber) {
			return [startIndex, i];
		}

		sum += input[i];
	}

	return [-1, -1];
}

function isValidSum(preamble, rest, number) {
	const seenNums = new Set();

	for (const num of preamble) {
		const lookForValue = number - num;
		if (seenNums.has(lookForValue)) {
			return true;
		}

		seenNums.add(num);
	}

	return false;
}

console.log(solve(input, 25));
