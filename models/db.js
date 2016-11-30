const pg = require("pg");
const connectionString = 'postgres://localhost:5432/pos';

const client = new pg.Client();
client.connect(connectionString);
const query = `CREATE TABLE employee(id SERIAL PRIMARY KEY NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, employee_id INT NOT NULL, is_admin BOOLEAN)`
client.query(query)
	.then(res => console.log ('res:', res))
	.then(() => client.end())
	.catch(err => console.log ('err:', err)
