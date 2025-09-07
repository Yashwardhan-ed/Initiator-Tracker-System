import jwt from "jsonwebtoken"

const generateToken = (id) => {
    try {
        const token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '10d'});
        return token;
    } catch(err){
        throw new Error("Error generating token: ")
    }
};

export default generateToken;