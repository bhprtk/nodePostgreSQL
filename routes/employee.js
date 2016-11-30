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
			client.query(`SELECT * FROM employee`, (err, result) => {
				if(err) res.status(500).send(err);
				res.send(result.rows);
				client.end(err => {if(err) throw err});
			})
		})
	})
	.post((req, res) => {
		const { first_name, last_name, employee_id, is_admin } = req.body
		pg.connect(connectionString, (err, client, done) => {
			if(err) {
				done();
				return res.status(500).send(err);
			}

			client.query(`INSERT INTO
					employee (first_name, last_name, employee_id, is_admin)
					VALUES ('${first_name}', '${last_name}', ${employee_id}, ${is_admin})`);

			done();
			res.send();
		})
	})

router.route('/:employee_id')
	.get((req, res) => {
		const { employee_id } = req.params;
		pg.connect(connectionString, (err, client, done) => {
			if(err) {
				done();
				return res.status(500).send(err);
			}
			client.query(`SELECT * FROM employee WHERE employee_id = ${employee_id}`, (err, result) => {
				if(err) res.status(500).send(err);
				if(result.rows.length) {
					res.send(result.rows);
				} else {
					res.send('Employee not found');
				}
				client.end(err => {if(err) throw err});
			})
		})
	})

module.exports = router;
