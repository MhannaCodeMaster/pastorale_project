const db = require('../util/database');

class User{
    constructor(id, username, password, email){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static checkUser(username, password){
        return db.execute('SELECT * FROM users WHERE user_name = ? AND user_password = ?',[username,password]);
    }

    static getUserEmail(email){
        return db.execute('SELECT user_email FROM users WHERE user_email = ?',[email]);
    }
    
    static updatePass(email,newPass){
        return db.execute('UPDATE users SET user_password = ? WHERE user_email = ?',[newPass,email]);
    }
}

module.exports = User;