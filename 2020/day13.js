const fs = require('fs');

const ids = fs
	.readFileSync('./day13.txt', 'utf-8')
	.split(',')
	.map((id, index) => {
		return {
			id: +id,
			offset: index,
		};
	})
	.filter(time => !Number.isNaN(time.id));

function solve(ids) {
	let solved = false;
	let multiplier = 1;
	let t;
	while (!solved) {
		t = ids[0].id * multiplier;
		let found = true;
		const slicedIDS = ids.slice(1);

		for (const { id, offset } of slicedIDS) {
			if ((t + offset) % id !== 0) {
				found = false;
				break;
			}
		}

		if (found) solved = true;
		multiplier++;
	}
	return t;
	const { id: correctID, value } = getCorrectIDData(estimateStamp, ids);
	const timeToWait = value - estimateStamp;
	return correctID * timeToWait;
}
function getCorrectIDData(estimateStamp, ids) {
	return ids
		.map(id => {
			return {
				id,
				value: id * Math.ceil(estimateStamp / id),
			};
		})
		.reduce(
			(a, b) => {
				return b.value < a.value ? b : a;
			},
			{ id: 0, value: Infinity }
		);
}

console.log(solve(ids));
