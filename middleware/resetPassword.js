function resetPassword(req, res) {
    res.render("reset-password.ejs", {});
}

module.exports = {
    resetPassword
}