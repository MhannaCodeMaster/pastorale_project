const User = require('../models/user');

exports.getIndex = (req,res,next) =>{
    User.getUserByid(req.session.user_id).then(([result])=>{
        res.render('../view/index.ejs',{pageTitle: 'Home',username:result[0].user_name});
    }).catch(err=>{
        res.render('../view/index.ejs',{pageTitle: 'Home',username:''});
    });
}
