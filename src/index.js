require('dotenv').config();

const server = require('./server.js');

const options = { PORT: process.env.PORT || 4000 };

server.start(options, ({ PORT }) => {
	console.log(`Running on ${PORT}`);
});
