const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
	return res.json({ message: 'Are you ready to learn about badminton?' });
});

app.get('/equipment', (req, res) => {
	return res.json({
		message:
			'In order to play, you will need a racket, birdies, and an indoor court with a net',
	});
});

app.get('/rocks', (req, res) => {
	return res.json({
		message:
			'Badminton Rocks!! Let the game begin!!',
	});
});

app.get('/score/:num1/:num2', (req, res) => {
	let num1 = Number(req.params.num1);
	let num2 = Number(req.params.num2);
	return res.json({ score: `Player 1: ${num1}, Player 2: ${num2}` });
});

app.get('/olympics/:year', (req, res) => {
	let year = req.params.year;
	let message;
	if (year >= 2024) {
		message = 'Are you living in the future?';
	} else if (year === 1972 || (year >= 1988 && year % 4 === 0)) {
		message = `The ${year} Summer Olympics included badminton`;
	} else {
		message = `Badminton was not in the Summer Olympics this year`;
	}

	return res.json({ message: message });
});

app.get('/read', (req, res) => {
	let element = req.query.params;
	fs.readFile(`${element}.txt`, 'utf8', (err, data) => {
		if (err) {
			return res.json({
				message: 'There was a problem reading the file.',
				err,
			});
		} else {
			return res.json({ message: data });
		}
	});
});

const PORT = process.env.FORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
