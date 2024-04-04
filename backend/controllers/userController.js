const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const crearteToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}


const loginUser = async (req, res) => {
    res.json({message: 'login user'})
}

const signupUser = async (req, res) => {
    const [email, password] = [req.body.email, req.body.password]
    try {
        const user = await User.signup(email, password)

        const token = crearteToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { loginUser, signupUser}