const fs = require('fs');
const input = fs.readFileSync('./day8.txt', 'utf-8').split('\n');

function isTerminating(newCommand, index) {
	const executedIds = [];
	let result = false;
	let acc = 0;
	for (let i = 0; i < input.length; i++) {
		if (executedIds.includes(i)) {
			return [result, acc];
		}

		executedIds.push(i);

		let [command, value] = input[i].split(' ');

		if (i == index) {
			command = newCommand;
		}

		if (command === 'acc') {
			acc += +value;
		} else if (command === 'jmp') {
			i += +value - 1;
		}
	}

	result = true;
	return [result, acc];
}

function solve() {
	let acc = 0;
	let success;

	for (i in input) {
		const [command] = input[i].split(' ');
		if (command === 'jmp') {
			success = isTerminating('nop', i);
		} else if (command === 'nop') {
			success = isTerminating('jmp', i);
		}

		if (success[0]) {
			return success[1];
		}
	}
}

console.log(solve());
