const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pastorale_db',
    password: ''
});

module.exports = pool.promise();