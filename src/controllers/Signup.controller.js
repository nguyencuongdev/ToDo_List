const User = require('../models/User');
const SignupController = {};

SignupController.showView = (req, res) => {
    res.render('signup', { layout: false });
}

SignupController.handleCreateAccount = async (req, res) => {
    try {
        const account = await Promise.resolve({
            name: req.body.firstname + '' + req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            createAt: new Date(),
            updateAt: new Date()
        })
        await User.createAccount(account);
        res.status(200).json('Account created successfully!');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}
module.exports = SignupController;