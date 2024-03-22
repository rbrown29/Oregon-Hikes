// Middleware to check if the user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.session.username) {
      return next();
    }
    // Redirect to login page if not logged in
    req.flash('error', 'You must be logged in to view that page');
    res.redirect('/login');
  }

module.exports = {
    ensureAuthenticated
}