const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const list = [];
const workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const getDate = () => {

	const today = new Date();

	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	};

	return today.toLocaleDateString('en-US', options);
}

app.get('/', (req, res) => {
	res.render('list', { listTitle: getDate(), tasks: list })
});

app.get('/work', (req, res) => {
	res.render('list', { listTitle: 'Work', tasks: workTasks })
});

app.post('/', (req, res) => {

	const newItem = req.body.newItem;

	if (req.body.myLists === 'Work') {
		workTasks.push(newItem);
		res.redirect('/work');
	}
	else {
		list.push(newItem);
		res.redirect('/');
	}

})

app.listen(3000, () => {
	console.log('up and running on 3000');
});
