const jwt = require('jsonwebtoken');
const JWT_SECRET = "HOLOA hola It's the monster haha haha"
const fetchUser = (req,res,next)=>{
    //get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token ){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET); //yaha pr hum apne token k data mai se jo id hai usse se user ko authenticate kar rahe hai 
        req.user = data.user;
        next();    
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
}
module.exports = fetchUser