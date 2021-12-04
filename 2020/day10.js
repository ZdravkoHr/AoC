const fs = require('fs');
const input = fs.readFileSync('./day10.txt', 'utf-8').split('\n').map(Number);

function solve(input) {
	input.sort((a, b) => a - b);

	let arrangements = 0;
	let current = 0;
	const choices = [];

	for (const i in input) {
		// for (let j = +i + 1; j < input.length; j++) {
		//     let difference = input[j] - current;

		// }
		const num = input[i];
		const currentChoices = [];
		let num2 = num;
		let difference = num2 - current;
		let j = 0;

		while (difference <= 3) {
			j++;
			currentChoices.push(num2);
			num2 = input[+i + j];
			difference = num2 - current;
		}

		current = num;

		choices.push(currentChoices);
	}
	console.log(choices);
	for (let i = 0; i < choices.length - 1; i += 2) {
		const currentLength = choices[i].length;
		const nextLength = choices[i + 1].length;

		if (currentLength === 1) {
			arrangements += nextLength > 1 ? nextLength : 0;
		} else if (currentLength > 1) {
			arrangements += currentLength * nextLength;
		}
	}

	return arrangements || 1;
}

console.log(solve(input));
