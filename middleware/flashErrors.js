function flashErrors (req, res, next) {
    res.locals.flashMessages = req.flash();
    next();
};

module.exports = {
    flashErrors
}