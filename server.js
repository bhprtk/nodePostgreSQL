const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pg = require("pg");
const colors = require("colors");
const morgan = require("morgan");

const app = express();
const PORT = 3000;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes'));

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`.green);
})
