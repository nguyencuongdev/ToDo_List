const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const SignupController = {};

SignupController.showView = (req, res) => {
    res.render('signup', { layout: false });
}

SignupController.handleCreateAccount = async (req, res) => {
    try {
        const stringSalt = await bcrypt.genSalt(+process.env.SALT_ROUND);
        const hashedPassword = await bcrypt.hash(req.body.password, stringSalt);
        const account = await Promise.resolve({
            name: req.body.firstname + ' ' + req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            createAt: new Date(),
            updateAt: new Date()
        })
        await User.createAccount(account);
        console.log('Account created successfully!');
        res.status(201).render('login', { layout: false, message: '' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}
module.exports = SignupController;