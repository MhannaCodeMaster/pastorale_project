const User = require('../models/user');

exports.getIndex = (req,res,next) =>{
    res.render('../view/index.ejs',{pageTitle: 'Home',username:req.session.isLogged});
}
