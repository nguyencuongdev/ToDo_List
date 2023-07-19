const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const LoginController = {};
LoginController.showView = (req, res) => {
    res.render('login', { layout: false });
}

LoginController.handleLogin = async (req, res) => {
    try {
        const user = await User.getUserByUsername(req.body.username);
        if (!user) {
            res.status(404).json('User not found!');
        }
        else {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                res.status(400).json('Wrong password!');
            }
            else {
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    createAt: user.createAt,
                    updateAt: user.updateAt
                }
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
                res.cookie('accessToken', accessToken, { maxAge: 1 });
                res.cookie('refreshToken', refreshToken, { maxAge: 1 });
                res.status(200).json({ message: 'Login successfully!', accessToken, refreshToken });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = LoginController;