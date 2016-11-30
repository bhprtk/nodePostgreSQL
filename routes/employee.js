const express = require('express');
const router = express.Router();
const pg = require("pg");

const connectionString = 'postgres://localhost:5432/pos';

router.route('/')
	.get((req, res) => {
		pg.connect(connectionString, (err, client, done) => {
			if(err) {
				done();
				return res.status(500).send(err);
			}
		})
	})
	.post((req, res) => {
		const { first_name, last_name, employee_id, is_admin } = req.body
		pg.connect(connectionString, (err, client, done) => {
			if(err) {
				done();
				return res.status(500).send(err);
			}

			const query =	client.query(`INSERT INTO
					employee (first_name, last_name, employee_id, is_admin)
					VALUES ('${first_name}', '${last_name}', ${employee_id}, ${is_admin})`);

			query.on('end', () => {
				done();
				res.send("done")
			})
		})
	})

module.exports = router;
