const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'project_guesthouse',
    password: ''
});

module.exports = pool.promise();