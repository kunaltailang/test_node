const jwt = require('jsonwebtoken')


const auth = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log(token)

    try {
        if(token){
            let decode = jwt.verify(token,"yogi");
            if(decode){
                req.body.userId = decode.userId;
                next();
            }else{
                return res.status(401).json({"message":"Invalid Credential"})
            }

        }else{
            return res.status(200).json({"error":"You are not Authorized"})
        }
    } catch (error) {
        return res.status(500).json({"error":error});
    }
}

module.exports={
    auth
}