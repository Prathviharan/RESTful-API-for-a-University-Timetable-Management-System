const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [
    {id:1 , username: 'admin', password: '',role:'admin'},
    {id:2 , username: 'faculty', password: '',role:'faculty'},
    {id:3 , username: 'student', password: '',role:'student'},
];

//JWT token secret key
const secretKey = '';

const generateToken = (user) => {
    return jwt.sign({
        id:user.id,
        role: user.role
    },
    secretKey,{
        expiresIn: '1h'
    });
};

const verifyToken = (token) => {
    try{
        return jwt.verify(token,secretKey);
    }catch(error){
        return null;
    }
};


//login function
exports.login = (req,res) => {
    const {username,password} = req.body;

    //username find
    const user = users.find(u => u.username === username);

    //if user exist check password
    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({message: "Invalid Username or Password"})
    }

    const token = generateToken(user);

    res.json({token});
};

//logut function
exports.logout = (req,res) =>{
    res.json({message: "Logged Out Successfully"});
};


//Middleware 
exports.verifyTokenAndRole = (role) => (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    //check token
    if(!token){
        return res.status(401).json({message: 'Unauthorized: Missing Token'});
    }
    //verify token
    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(401).json({message: 'Unauthorized: Invalid Token'});
    }
    //check user role
    if(!role.includes(decoded.role)){
        return res.status(403).json({message: 'Forbidden: Insufficient permissions'});
    }

    req.userId = decoded.id;
    next();
};