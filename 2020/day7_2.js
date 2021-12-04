const fs = require('fs');
let instructions;

try {
	const data = fs.readFileSync('./day7.txt', 'utf8');
	instructions = data.split('\n');
} catch (err) {
	console.error(err);
}

const graph = {};

function parseLine(line) {
	line = line.slice(0, line.length - 2);
	const containedBagsArray = [];
	const bagsIndex = line.indexOf('bags');
	const containIndex = line.indexOf('contain');
	const mainBag = line.slice(0, bagsIndex - 1);
	const containedBags = line.slice(containIndex + 7);
	const containedBagsInfo = containedBags
		.split(', ')
		.map(bag => {
			bag = bag.trim();
			const spaceIndex = bag.indexOf(' ');
			bag = bag.replace(/bag(s)?/, '');
			if (bag.indexOf('other') !== -1) {
				return '';
			}
			return bag.slice(spaceIndex).trim();
		})
		.filter(Boolean);

	return { destination: mainBag, sources: containedBagsInfo };
}

function solve(instructions, graph) {
	instructions.forEach(instruction => {
		const { destination, sources } = parseLine(instruction);
		if (!(destination in graph)) {
			graph[destination] = new Set();
		}

		sources.forEach(source => {
			if (!(source in graph)) {
				graph[source] = new Set();
			}

			graph[source].add(destination);
		});
	});

	const result = traverse(graph, 'shiny gold') - 1;
	return result;
}

function traverse(graph, node, visited = new Set()) {
	let result = 1;
	if (visited.has(node)) {
		return 0;
	}

	visited.add(node);

	for (let neighbor of graph[node]) {
		result += traverse(graph, neighbor, visited);
	}

	return result;
}

console.log(solve(instructions, graph));
