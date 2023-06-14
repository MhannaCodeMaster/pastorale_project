const Beneficiary = require('../models/beneficiary.js');

exports.getTable = (req,res,next) =>{
    Beneficiary.getAll()
    .then(([result])=>{
        res.render('../view/beneficiary_table',{pageTitle:'All Forms',result:result});
    })
    .catch(error=>{
        console.log(error);
        res.redirect('/');
    });
}