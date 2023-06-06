const User = require('../models/user');

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

    User.checkUser(username, password)
    .then(([result])=>{
        if(result.length !==0){
            //console.log(result);
            req.session.user_id = result[0].user_id;
            res.redirect('/');
        }
        else{
            //console.log(result);
            res.redirect('/login?err=login&msg=email or password incorrect!');
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(400).redirect('/login?err=login&msg=Something went wrong!');
    });  
}

exports.logout = (req,res,next) =>{
    req.session.destroy((err)=>{
        if(err){
            console.log('Error destroying session:', err);
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
            res.redirect('/login?err=forgotPass&msg=email not found!');
        }else{
            const email = result.user_email;
            res.redirect('/login?success=true&msg=link has been sent');
        }
    }).catch(err=>{
        res.redirect('/login?err=forgotPass&msg=Something went wrong');
    });
}
