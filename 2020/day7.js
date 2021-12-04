const fs = require('fs');

try {
	const data = fs.readFileSync('./day7.txt', 'utf8');
	instructions = data.split('\n');
} catch (err) {
	console.error(err);
}

const bagsInfo = {};
let result = 0;

instructions.forEach(instruction => {
	instruction = instruction.slice(0, instruction.length - 2);
	const containedBagsArray = [];
	const bagsIndex = instruction.indexOf('bags');
	const containIndex = instruction.indexOf('contain');
	const mainBag = instruction.slice(0, bagsIndex - 1);
	const containedBags = instruction.slice(containIndex + 7);
	const containedBagsInfo = containedBags.split(', ');
	containedBagsInfo.forEach(bagInfo => {
		bagInfo = bagInfo.trim();
		const spaceIndex = bagInfo.indexOf(' ');
		const quantity = +bagInfo.slice(0, spaceIndex);
		const bag = bagInfo.slice(spaceIndex + 1);

		if (quantity) {
			containedBagsArray.push([bag, quantity]);
		}
	});

	bagsInfo[mainBag] = containedBagsArray;
});

let totalCount = findCurrentCount(bagsInfo['shiny gold']) - 1;
console.log(totalCount);
function findCurrentCount(bag) {
	let result = 1;

	bag.forEach(([newBag, quantity]) => {
		newBag = newBag.replace(/ bag(s)?/, '');
		result += quantity * findCurrentCount(bagsInfo[newBag]);
	});

	return result;
	// if (!bag.length) return 0;

	// for (object of bag) {
	// 	let [[bagName, quantity]] = Object.entries(object);

	// 	bagName = bagName.slice(0, -5);

	// 	k = quantity * k;
	// 	result += k + findCurrentCount(bagsInfo[bagName] || [], result, k);

	// 	k = 1;
	// }

	// return result;

	// // return result;
}
