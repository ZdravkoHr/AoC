const { EBADMSG } = require('constants');
const fs = require('fs');

const input = fs
	.readFileSync('./day12.txt', 'utf-8')
	.split('\n')
	.filter(Boolean);

function solve(input) {
	const directions = ['E', 'S', 'W', 'N'];
	let currentDirectionIndex = 0;
	let x = 'E';
	let y = 'N';
	const shipCoords = {
		north: 0,
		east: 0,
	};
	const waypointCoords = {
		north: 1,
		east: 10,
	};
	input.forEach(line => {
		const digitIndex = line.match(/\d/).index;
		const command = line.slice(0, digitIndex);
		const value = +line.slice(digitIndex);

		if (command === 'N') {
			waypointCoords.north += value;
		} else if (command === 'S') {
			waypointCoords.north -= value;
		} else if (command === 'E') {
			waypointCoords.east += value;
		} else if (command === 'W') {
			waypointCoords.east -= value;
		} else if (command === 'L') {
			currentDirectionIndex = turnRight(waypointCoords, 360 - value);
		} else if (command === 'R') {
			currentDirectionIndex = turnRight(waypointCoords, value);
		} else if (command === 'F') {
			if (x === 'E') {
				shipCoords.east += waypointCoords.east * value;
			} else {
				shipCoords.east -= waypointCoords.east * value;
			}

			if (y === 'N') {
				shipCoords.north += waypointCoords.north * value;
			} else {
				shipCoords.north -= waypointCoords.north * value;
			}
			// switch (directions[currentDirectionIndex]) {
			// 	case 'E':
			// 		eastVal += value;
			// 		break;
			// 	case 'W':
			// 		eastVal -= value;
			// 		break;
			// 	case 'N':
			// 		northVal += value;
			// 		break;
			// 	case 'S':
			// 		northVal -= value;
			// 		break;
			// }
		}
	});

	return Math.abs(shipCoords.east) + Math.abs(shipCoords.north);
}

// function turnRight(directions, index, degrees) {
// 	return (index + Math.trunc(degrees / 90)) % directions.length;
// }

function turnRight(waypointCoords, degrees) {
	const east = waypointCoords.east;
	waypointCoords.east = waypointCoords.north;
	if (degrees === 180) {
		//waypointCoords.north = -east;
		x = 'W';
	} else if (degrees === 90) {
		waypointCoords.north = east;
	} else if (degrees === 270) {
		waypointCoords.north = -east;
		y = 'S';
	}
}

console.log(solve(input));
