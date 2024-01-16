const pool = require("../database/db");
const jwt = require('jsonwebtoken');

async function getToken(user) {
    return jwt.sign({id: user.id, role: user.role}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "8h"})
}

const verifyToken = (req, res, next) => {
    const authHead = req.headers.authorization
    if (authHead){
        const token = authHead.split(" ")[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })

    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    getToken,
    verifyToken
};