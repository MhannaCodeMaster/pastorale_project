exports.getSettingsPage = (req,res,next) => {
    res.render('../view/settings/settings.ejs', {pageTitle: 'Settings'});
}