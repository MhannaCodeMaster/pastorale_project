const User = require('../models/user');

exports.getIndex = (req,res,next) =>{
    const username = req.session.username;
   res.render('../view/index.ejs',{pageTitle: 'Home',username}); 
}
