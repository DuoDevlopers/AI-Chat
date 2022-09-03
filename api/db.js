const mysql = require('mysql');
const con = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ai',
    clearExpired: true,
    session_id: Math.random() * (99999999999999999999999 - 100000000000000000000000000),
    checkExpirationInterval: 30000,
    schema: {
        tableName: 'loginuser',
        columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}

    }


});

con.connect((err) => {
    if (err) throw err;
    console.log('Database Connected..');
});

module.exports = con;