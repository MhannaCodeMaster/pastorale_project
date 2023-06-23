const Beneficiary = require('../models/beneficiary.js');

exports.getTable = (req,res,next) =>{
    const pageTitle = 'All Forms'
    const username = req.session.username;
    let sortByName, sortByDate;
    let active = 'all';
    let search = null;
    if(req.query.hasOwnProperty('search')){
        search = req.query.search;
        active = 'none';
        sortByName = `/all-beneficiaries?search=${search}&by=first_name&sort=asc`;
        sortByDate = `/all-beneficiaries?search=${search}&by=interview_date&sort=asc`;
        if(req.query.hasOwnProperty('sort')){
            let sortIn = req.query.sort;
            const by = req.query.by;
            Beneficiary.Beneficiary.search(search, by, sortIn)
                .then(([result])=>{
                    console.log(result);
                    sortIn = (sortIn === "asc") ? 'desc' : 'asc'
                    if(req.query.by === 'first_name') sortByName = `/all-beneficiaries?search=${search}&by=first_name&sort=${sortIn}`;
                    else sortByDate = `/all-beneficiaries?search=${search}&by=interview_date&sort=${sortIn}`;
                    res.render('../view/beneficiary_table',{pageTitle, username, result ,active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
        }else{
            Beneficiary.Beneficiary.search(search)
            .then(([result])=>{
                res.render('../view/beneficiary_table',{pageTitle, username, result ,active, sortByName, sortByDate , search});
            })
            .catch(error=>{
                next(error)
            });
        }
        
    }
    else if(req.query.hasOwnProperty('show')){
        if(req.query.show === "all"){
            active = 'all';
            sortByName = '/all-beneficiaries?show=all&by=first_name&sort=asc';
            sortByDate = '/all-beneficiaries?show=all&by=interview_date&sort=asc';
            if(req.query.hasOwnProperty('sort')){
                let sortIn = req.query.sort;
                const by = req.query.by;
                Beneficiary.Beneficiary.getAll(by,sortIn)
                .then(([result])=>{
                    sortIn = (sortIn === "asc") ? 'desc' : 'asc'
                    if(req.query.by === 'first_name') sortByName = `/all-beneficiaries?show=all&by=first_name&sort=${sortIn}`;
                    else sortByDate = `/all-beneficiaries?show=all&by=interview_date&sort=${sortIn}`;
                    res.render('../view/beneficiary_table',{pageTitle, username, result ,active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            } else {
                Beneficiary.Beneficiary.getAll()
                .then(([result])=>{
                    res.render('../view/beneficiary_table',{pageTitle, username, result, active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            }
        }else if(req.query.show === "closed"){
            active = 'closed';
            sortByName = '/all-beneficiaries?show=closed&by=first_name&sort=asc';
            sortByDate = '/all-beneficiaries?show=closed&by=interview_date&sort=asc';
            if(req.query.hasOwnProperty('sort')){
                let sortIn = req.query.sort;
                const by = req.query.by;
                Beneficiary.Beneficiary.getClosed(by,sortIn)
                .then(([result])=>{
                    sortIn = (sortIn === "asc") ? 'desc' : 'asc'
                    if(req.query.by === 'first_name') sortByName = `/all-beneficiaries?show=closed&by=first_name&sort=${sortIn}`;
                    else sortByDate = `/all-beneficiaries?show=closed&by=interview_date&sort=${sortIn}`;
                    res.render('../view/beneficiary_table',{pageTitle, username, result ,active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            }else{
                Beneficiary.Beneficiary.getClosed()
                .then(([result])=>{
                    //console.log(result)
                    res.render('../view/beneficiary_table',{pageTitle, username, result, active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            }
        }else if(req.query.show === "current"){
            active = 'current';
            sortByName = '/all-beneficiaries?show=current&by=first_name&sort=asc';
            sortByDate = '/all-beneficiaries?show=current&by=interview_date&sort=asc';
            if(req.query.hasOwnProperty('sort')){
                let sortIn = req.query.sort;
                const by = req.query.by;
                Beneficiary.Beneficiary.getCurrent(by,sortIn)
                .then(([result])=>{
                    sortIn = (sortIn === "asc") ? 'desc' : 'asc'
                    if(req.query.by === 'first_name') sortByName = `/all-beneficiaries?show=current&by=first_name&sort=${sortIn}`;
                    else sortByDate = `/all-beneficiaries?show=current&by=interview_date&sort=${sortIn}`;
                    res.render('../view/beneficiary_table',{pageTitle, username, result ,active, sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            }else{
                Beneficiary.Beneficiary.getCurrent()
                .then(([result])=>{
                    res.render('../view/beneficiary_table',{pageTitle, username, result, active,sortByName, sortByDate, search});
                })
                .catch(error=>{
                    next(error)
                });
            }

        }
    }
    else{
        sortByName = '/all-beneficiaries?show=all&by=first_name&sort=asc';
        sortByDate = '/all-beneficiaries?show=all&by=interview_date&sort=asc';
        active = 'all';
        Beneficiary.Beneficiary.getAll()
        .then(([result])=>{
            res.render('../view/beneficiary_table',{pageTitle, username, result, active, sortByName, sortByDate, search});
        })
        .catch(error=>{
            next(error)
        });
    }
}

exports.postClose = (req,res,next) =>{
    const b_id = req.body.close_ben_id;
    const close_date = req.body.closure_date;
    const close_reason = req.body.closure_reason;
    Beneficiary.Beneficiary.close(b_id, close_date, close_reason)
    .then(()=>{
        res.redirect('/all-beneficiaries');
    })
    .catch(err=>{
        next(err);
    });
}