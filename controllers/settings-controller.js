const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getSettingsPage = (req,res,next) => {
    const user_id = req.session.user_id;
    const section = req.query.hasOwnProperty('section') ? req.query.section : '';
    const msg = req.query.hasOwnProperty('msg') ? req.query.msg : '';
    const err = req.query.hasOwnProperty('err') ? req.query.err : '';
    console.log('message:', msg);
    
    User.getUserByid(user_id).then(([result])=>{
        const user_name = result[0].user_name;
        const user_email = result[0].user_email;
        res.render('../view/settings/settings.ejs', {pageTitle: 'Settings', username:user_name, email:user_email,err:err,section:section, msg:msg});
    }).catch(err=>{
        console.log(err);
    });

}

exports.changeUsername = (req,res,next) => {
    const user_id = req.session.user_id;
    const new_name = req.body.username;

    let msg, section = 'account', err= true;
    User.changeUsername(user_id, new_name)
    .then(([result])=>{
        if(result.affectedRows !== 0){
            msg = 'username updated';
            err = false;
        }else{
            msg = "Can't update username";
        }
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    })
    .catch(error=>{
        console.log(error);
        msg = 'Something went wrong';
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    });
}

exports.changeEmail = (req,res,next) => {
    let msg, section='account', err=true;
    res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
}

exports.changePassword = (req,res,next) => {
    const user_id = req.session.user_id;
    const section = 'changePass';
    //console.log('passwords:', req.body);
    const {old_password, new_password} = req.body;
    //console.log('new_password:',new_password);
    let msg = '',err = true;
    User.changePass(user_id, new_password, old_password)
    .then(([result])=>{
        console.log('pass result',result.affectedRows);
        if(result.affectedRows !== 0){
            msg ='Password changed';
            err = false;
        }else{
            msg ='Incorrect password!';
        }
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    })
    .catch(error=>{
        msg = 'Something went wrong!';
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        console.log(error);
    });
}

exports.createNewUser = (req,res,next) =>{
    let msg,err = true, section = 'create';
    const {create_username,create_pass,create_email} = req.body;
    //console.log('User email:',create_email);
    bcrypt.hash(create_pass, 12)
    .then((hashedPass)=>{
        const user = new User(undefined, create_username, hashedPass, create_email);
        user.createUser()
        .then(result=>{
            console.log(result);
            if(result.created){
                err = false;
                msg = 'User created.';
            }
            else if(result.userExists){
                msg = 'User already exists.';
            }
            else if(result.insertError){
                msg = 'User already exists';
            }else{
                console.log('return:',result);
                msg = 'Something went wrong!';
            }
            res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        })
        .catch(error=>{
            console.log(error);
            msg = 'Something went wrong! Try again.';
            res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
        });

    })
    .catch(error=>{
        console.log(error);
        msg = 'Something went wrong! Try again.';
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    });
}

exports.deleteUser = (req,res,next) => {
    const username = req.body.username;
    const user_id = req.session.user_id;
    let msg, section = 'delete',err=true;
    User.deleteUser(user_id, username).then(result=>{
        //console.log(result);
        if (result.userDeleted){
            msg = 'User deleted';
            err = false;
        }else if(result.notFound){
            msg = 'User not found';
        }else if(result.currentUser){
            msg = 'Cannot delete your account!';
        }else{
            console.log(result);
            msg = 'Something went wrong!';
        }
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    }).catch(error=>{
        console.log('delete error:',error);
        msg = 'delete error!';
        res.redirect('/settings?err='+err+'&section='+section+'&msg='+msg);
    });
}