const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getSettingsPage = (req,res,next) => {
    const user_id = req.session.user_id;
    const section = req.query.hasOwnProperty('section') ? req.query.section : '';
    const msg = req.query.hasOwnProperty('msg') ? req.query.msg : '';
    const err = req.query.hasOwnProperty('err') ? req.query.err : '';
    console.log('message:', msg);
    
    User.getUserByid(user_id)
    .then(([result])=>{
        const user_name = result[0].user_name;
        const user_email = result[0].user_email;
        User.getAll(user_id)
        .then(([result])=>{
            //console.log('All users: ',result)
            res.render('../view/settings/settings.ejs', {pageTitle: 'Settings', allUsers:result,username:user_name, email:user_email,err:err,section:section, msg:msg});
        })
        .catch(err=>{
            next(err);
        })
    }).catch(err=>{
        next(err);
    });
}

exports.changeUsername = (req,res,next) => {
    const user_id = req.session.user_id;
    const new_name = req.body.username;
    let msg, section = 'account', err= true;
    User.getUserByName(new_name)
    .then(([result])=>{
        if(result.length === 0){
            User.changeUsername(user_id, new_name)
            .then(()=>{
                req.session.username = new_name;
                msg = 'username updated';
                err = false;
                res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
            })
            .catch(error=>{
                next(error);
            });
        }else{
            msg = 'username already exists';
            res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        }
    })
    .catch();
}

exports.changePassword = (req,res,next) => {
    const user_id = req.session.user_id;
    const section = 'changePass';
    //console.log('passwords:', req.body);
    const {old_password, new_password} = req.body;
    //console.log('new_password:',new_password);
    let msg = '',err = true;
    User.getUserByid(user_id)
    .then(([result])=>{
        return bcrypt.compare(old_password,result[0].user_password);
    })
    .then((doMatch)=>{
        if(doMatch){
            return bcrypt.hash(new_password, 12);
        }
        else{
            msg = 'Incorrect Password';
            return res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        }
    })
    .then((hashedPass)=>{
        return User.changePass(user_id,hashedPass);
    })
    .then(()=>{
        msg = 'Password changed'
        err = false;
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    })
    .catch(error=>{
        // msg = 'Something went wrong!';
        // res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        // console.log(error);
        next(error);
    });
}

exports.createNewUser = (req,res,next) =>{
    let msg,err = true, section;

    if('create_email' in req.body){
        console.log('creating account...')
        section = 'create';
        const {create_username,create_pass,create_email} = req.body;
        bcrypt.hash(create_pass, 12)
        .then((hashedPass)=>{
            const user = new User(undefined, create_username, hashedPass, create_email);
            user.createUser()
            .then(result=>{
                console.log('result for creating account: ',result);
                if(result.created){
                    err = false;
                    msg = 'User created.';
                }
                else if(result.userExists){
                    msg = 'User already exists.';
                }
                else{
                    console.log('return:',result);
                    msg = 'Something went wrong!';
                }
                res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
            })
            .catch(error=>{
                next(error);
            });

        })
        .catch(error=>{
            next(error);
        });
    }
    else{
        console.log('creating member...')
        section = 'member';
        const member_name = req.body.member_name;
        const member = new User(undefined, member_name, undefined, undefined);
        member.createUser()
            .then(result=>{
                console.log(result);
                if(result.created){
                    err = false;
                    msg = 'Member created.';
                }
                else if(result.userExists){
                    msg = 'Member already exists.';
                }else{
                    console.log('return:',result);
                    msg = 'Something went wrong! Please try again.';
                }
                res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
            })
            .catch(error=>{
                next(error);
            });

    }
}

exports.deleteUser = (req,res,next) => {
    const user_id = req.body.user_id;
    let msg, section = 'delete',err=true;
    User.deleteUser(user_id).then(result=>{
        //console.log(result);
        if (result.userDeleted === true){
            msg = 'User deleted';
            err = false;
        }else{
            console.log(result);
            msg = 'Something went wrong! Try again.';
        }
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    }).catch(error=>{
        next(error);
    });
}