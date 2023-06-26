const bcrypt = require('bcryptjs');
const db = require('../util/database');
const User = require('../models/user');
const sendFrogotPassEmail = require('../util/email'); 

exports.getLogin = (req,res,next)=>{
    const err = req.query.hasOwnProperty('err') ? req.query.err : null;
    const msg = req.query.hasOwnProperty('msg') ? req.query.msg : null;
    const success = req.query.hasOwnProperty('success') ? req.query.success : false;
    res.render('../view/auth/login_v2.ejs',{pageTitle:'Login',err:err,msg:msg,success:success});
}

exports.postLogin = (req,res,next)=> {
    const username = req.body.username;
    const password = req.body.password;
    //console.log('username:',username, 'password:',password);
    User.getUserByName(username)
    .then(([result])=>{
        if(result.length === 0){
            res.redirect('/login?err=login&msg=Invalid username or password');
        }
        else {
            bcrypt.compare(password, result[0].user_password)
            .then(doMatch=>{
                if(doMatch){
                    req.session.user_id = result[0].user_id;
                    req.session.username = result[0].user_name;
                    res.redirect("/")
                }else{
                    res.redirect('/login?err=login&msg=Invalid username or password');
                }
            })
            .catch(err=>{
                console.log(err);
                res.status(400).redirect('/login?err=login&msg=Something went wrong!');
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(400).redirect('/login?err=login&msg=Something went wrong!');
    })
}

exports.logout = (req,res,next) =>{
    req.session.destroy((err)=>{
        if(err){
            console.log('Error destroying session:', err);
            next(err);
        }else{
            console.log('user logged out...')
            res.redirect("/login");
        }
    })
}

exports.forgotPass = (req,res,next) =>{
    const user_email = req.body.email;
    User.getUserByEmail(user_email)
    .then(([result])=>{
        if(result.length === 0){
            res.redirect('/login?err=forgotPass&msg=Email Not Found!');
        }else{
            const email = result[0].user_email;
            const user_id = result[0].user_id;
            sendFrogotPassEmail(user_id, email, res)
        }
    })
    .catch(err=>{
        console.log(err);
        // res.redirect('/login?err=forgotPass&msg='+err);
        next(err);
    });
}

exports.getResetPage = (req,res,next) =>{
    let err = true, msg='';
    const user_id = req.query.userid;
    const token = req.query.token;
    User.getUserByid(user_id)
    .then(([result])=>{
        //console.log(result);
        if(result.length !== 0 && result[0].token !== null){
            const user_token = result[0].token;
            const token_expiration = new Date(result[0].token_expiration);
            //console.log('user token: ',user_token)
            //console.log('provided token: ',token)
            bcrypt.compare(token, user_token)
            .then(doMatch=>{
                if(doMatch){
                    const current = new Date();
                    if(token_expiration < current){ // Token available but expired
                        msg = 'Token expired!';
                        console.log('Token expired');
                    }else if(!req.session.page_sent){
                        req.session.page_sent = new Date();
                        //console.log('page sent on:',req.session.page_sent);
                        err=false;
                    }else {
                        const time_difference = current - req.session.page_sent
                        const expirationDuration = 15 * 60 * 1000;
                        //console.log('test');
                        if(time_difference > expirationDuration){
                            msg='Page expired!'
                            console.log('time difference:',time_difference);
                        }else{
                            err = false;
                        }
                    }
                }else{
                    msg = 'Invalid token!';
                    console.log('Invalid token');
                    return next();
                }
                console.log('session:',req.session.page_sent);
                const hours = req.session.page_sent.getHours();
                const minutes = req.session.page_sent.getMinutes();
                const seconds = req.session.page_sent.getSeconds();
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                return res.render('../view/auth/forgot-password.ejs',{pageTitle:'Reset',user_id:user_id,timer:15,page_sent:formattedTime, err:err,msg:msg});
            })
            .catch(error=>{
                next(error);
            });
        }else{
            msg=`We apologize, but it seems that the password reset link has expired or is invalid.
              Please ensure that you have requested a password reset recently`;
            res.redirect('/login?err=Password Reset Failed&msg='+msg);
        }
    })
    .catch(err=>{
        next(err);
    });
}

exports.postResetPass = (req,res,next) =>{
    const date_sent = new Date(req.session.page_sent);
    const current = new Date();
    const timeDifference = current.getTime() - date_sent.getTime();
    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

    if (timeDifferenceInMinutes < 15) {
        const user_id = req.body.user_id;
        const new_pass = req.body.new_password;
        //console.log('Password changed');
        bcrypt.hash(new_pass, 12)
        .then(hashed_pass=>{
            return User.resetPassword(user_id, hashed_pass)
        })
        .then(([result])=>{
            //console.log('success:',result);
            const msg = 'Your password has been successfully reset. You can now log in to your account using your new password.';
            db.execute('UPDATE users SET token = NULL,token_expiration = NULL WHERE user_id = ? ',[user_id]);
            res.redirect('/login?success=Password Reset Successful&form=login&msg='+msg);
        })
        .catch(err=>{
            next(err);
        })
    }else{
        console.log('page expired!')
    }
}
