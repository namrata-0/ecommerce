const jwt = require('jsonwebtoken');
const verify = async(req, res, next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "private_key", function(err, decode){
            if(err){
                console.log("token is invalid")
                res.send({message : "token is invalid", status:0})
            }else{
                // console.log("token generated succesfully" , decode)
                next();
            }
        });
    }else{
        res.send({message : "token not found", status:0})
    }
}
module.exports = verify;