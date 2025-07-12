const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Mengatur akses domain lain terhadap aplikasi (CORS)
app.use(express.json()); // Memungkinkan pengolahan body request dalam format JSON
app.use(express.urlencoded()); // Memungkinkan pengolahan body request dengan format x-www-form-urlencoded
app.use(morgan('dev')); // Menampilkan log HTTP ke console untuk kebutuhan debugging

app.use('/', (req, res, next) => {
	if (req.body?.password != 'halo') {
		res.status(401).json({ message: 'Access denied' });
		return;
	}
	next();
});

app.get('/', (req, res) => {
	res.status(200).send('Hello world');
});

const userRouter = express.Router();

const users = [
	{
		username: 'justinuschaw',
		email: 'bukanjustinchow@gmail.com',
	},
	{
		username: 'nichoger',
		email: 'bukangerrynicholas@gmail.com',
	},
];

userRouter.get('/', (req, res) => {
	res.status(200).json(users);
});

app.use('/users', userRouter);

app.get('/proker', async (req, res) => {
	try {
		const result = await prisma.programKerja.findMany();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Database error');
	}
});

const getAllUsers = (req, res) => {};

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
