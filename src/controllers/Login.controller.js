const LoginController = {};
LoginController.showView = (req, res) => {
    res.render('login', { layout: false });
}

module.exports = LoginController;