function loggedUser (req, res, next) {
    res.locals.loggedIn = !!req.session.username;
    res.locals.username = req.session.username || "";
    next();
};

module.exports = {
    loggedUser
}