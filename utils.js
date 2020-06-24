const jwt = require('jsonwebtoken');

function getUserToken(user){
    if(!user)
    {
        return null
    }

    const data = {
        name:user.username,
        name1:user.username+user.username
    }

    return jwt.sign(data,process.env.jwt_secret,{expiresIn:60*60});
}

module.exports={
    getUserToken
}