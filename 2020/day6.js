const fs = require('fs');
let input;

try {
	const data = fs.readFileSync('./day6.txt', 'utf8');
	input = data;
} catch (err) {
	console.error(err);
}

function solve(input) {
	const groups = input.split(/\r\n\r/g);

	let totalSum = 0;
	const final = [];
	groups.forEach(group => {
		// let chars = group.split('');
		group = group.trim();
		const people = (group.match(/\n/g) || []).length + 1;
		const rows = group.split('\n');

		for (const char of rows[0].trim()) {
			let toInclude = true;
			let row = 1;

			while (row < rows.length) {
				if (rows[row].indexOf(char) === -1) {
					toInclude = false;
					break;
				}
				row++;
			}

			if (toInclude) final.push(char);
		}
	});

	return final.length;
}

console.log(solve(input));
