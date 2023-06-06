const db = require('../util/database');

class User{
    constructor(id, username, password, email){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static getUserByid(user_id){
        return db.execute('SELECT user_id, user_name, user_email FROM users WHERE user_id = ? AND removed IS NULL',[user_id]);
    }
    static getUserByName(username){
        return db.execute('SELECT user_id, user_name, user_email FROM users WHERE user_name = ? AND removed IS NULL',[username]);
    }
    static getUserByEmail(email){
        return db.execute('SELECT user_id, user_name, user_email FROM users WHERE user_email = ? AND removed IS NULL',[email]);
    }

    static checkUser(username, password){
        return db.execute('SELECT * FROM users WHERE user_name = ? AND user_password = ? AND removed IS NULL',[username,password]);
    }
 
    static changePass(user_id,new_pass, old_pass){
        return db.execute('UPDATE users SET user_password = ? WHERE user_id = ? AND user_password = ?',[new_pass,user_id,old_pass]);
    }

    static deleteUser(user_id,username){
        return this.getUserByName(username)
        .then(([result])=>{
            if(result.length!==0){
                /*checking if the same id of the current user*/
                if(result[0].user_id === user_id){
                    return 2;
                }
                db.execute('UPDATE users SET removed = CURRENT_TIME() WHERE user_id = ?',[result[0].user_id])
                .then(()=>{
                    return 0;
                })
                .catch(err=>{
                    console.log(err);
                    return -1;
                });
            }else{
                return 1;
            }
        }).catch(err=>{
            console.log(err);
            return -1;
        });
    }

    static changeEmail(email){

    }

    static changeUsername(user_id, new_username){
        return db.execute('UPDATE users SET user_name = ? WHERE user_id = ?',[new_username,user_id]);
    }

}

module.exports = User;