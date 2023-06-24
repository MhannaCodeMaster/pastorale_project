const db = require('../util/database');
const bcrypt = require('bcryptjs');

class User{
    constructor(id, username, password, email){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
    
    createUser(){
        if(this.email === undefined){
            return User.getUserByName(this.username)
            .then(([result])=>{
                console.log(result);
                if(result.length === 0){
                    return db.execute('INSERT INTO users(user_name, user_type) VALUES(?,?)',[this.username, 'member'])
                    .then(()=>{
                        return {created:true};
                    })
                }else{
                    return {userExists:true};
                }
            })
            .catch(err=>{
                console.log('New member insert error',err)
                return {insertError:true};
            })
        }
        else{
            return User.getUserByEmail(this.email)
            .then(([result])=>{
                console.log('check email result:', result);
                if(result.length !== 0){
                    return {userExists:true};
                }else {
                    return User.getUserByName(this.username)
                    .then(([result])=>{
                        console.log('check username result:', result);
                        if(result.length !== 0){
                            return {userExists:true};
                        }else{
                            return db.execute("INSERT INTO users(user_name, user_email, user_password,user_type) VALUES(?, ?, ?, ?)"
                            ,[this.username, this.email, this.password, 'admin'])
                            .then(()=>{
                                return {created:true};
                            })
                            .catch(err=>{
                                console(err);
                                return {insertError:true};
                            })
                        }
                    })
                    .catch(err=>{
                        console.log('error email result:', err);
                        return {usernameError:true};
                    });
                }
            })
            .catch(err=>{
                console.log('error email result:', err);
                return {emailError:true};
            });
        }
    }

    static getAll(current_user){
        return db.execute('SELECT user_id, user_name, user_type FROM users WHERE removed IS NULL AND user_id != ?',[current_user]);
    }

    static getUserByid(user_id){
        return db.execute('SELECT * FROM users WHERE user_id = ? AND removed IS NULL',[user_id]);
    }
    static getUserByName(username){
        return db.execute('SELECT user_id, user_name, user_email, user_password FROM users WHERE user_name = ? AND removed IS NULL',[username]);
    }
    static getUserByEmail(email){
        return db.execute('SELECT user_id, user_name, user_email FROM users WHERE user_email = ? AND removed IS NULL',[email]);
    }
    
    static checkUser(username, password){
        return db.execute('SELECT * FROM users WHERE user_name = ? AND user_password = ? AND removed IS NULL',[username,password]);
    }
 
    static changePass(user_id,new_pass){
        return db.execute('UPDATE users SET user_password = ? WHERE user_id = ? ',[new_pass,user_id]);
    }

    static deleteUser(user_id){
        return db.execute('UPDATE users SET removed = CURRENT_TIME() WHERE user_id = ?',[user_id])
        .then(()=>{
            return {userDeleted:true};
        })
        .catch(err=>{
            console.log(err);
            return {userDeleted:false};
        });
    }

    static changeUsername(user_id, new_username){
        return db.execute('UPDATE users SET user_name = ? WHERE user_id = ?',[new_username,user_id]);
    }

    static resetPassword(user_id, new_password){
        return db.execute('UPDATE users SET user_password = ? WHERE user_id = ?',[new_password, user_id]);
    }

}

module.exports = User;