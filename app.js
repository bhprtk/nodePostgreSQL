const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const pg = require("pg");
const colors = require("colors");

const app = express();
const PORT = 3000;
// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	console.log('TEST');
})

// Server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`.green);
})
