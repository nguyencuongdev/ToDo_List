const LoginController = {};
LoginController.getIndex = (req, res) => {
    res.render('login', { layout: false });
}

module.exports = LoginController;