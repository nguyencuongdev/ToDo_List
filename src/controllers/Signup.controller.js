const SignupController = {};

SignupController.getIndex = (req, res) => {
    res.render('signup', { layout: false });
}

module.exports = SignupController;