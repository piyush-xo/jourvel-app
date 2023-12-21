const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, "secret123", {expiresIn: 6 * 60 * 60,}) //expires in six hours
}

module.exports = generateToken;