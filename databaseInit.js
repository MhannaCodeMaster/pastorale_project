const sql = require('mysql2');

var db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pastorale_db'
})

function connectDB() {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (!err) {
                console.log("connected to database")
                resolve(true)
            } else {
                reject(err)
                db.destroy()
                console.log(err)
            }
        })
    })
}
try{
    connectDB()
} catch {
    console.log("error connecting to db")
}


module.exports = { db, connectDB }