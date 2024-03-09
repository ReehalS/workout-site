const User = require('../models/userModel')


const loginUser = async (req, res) => {
    res.json({message: 'login user'})
}

const signupUser = async (req, res) => {
    const [email, password] = [req.body.email, req.body.password]
    try {
        const user = await User.signup(email, password)
        res.status(200).json({email,user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { loginUser, signupUser}