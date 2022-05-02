import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtGenerator = (userId)=> {
    const payload = {
        user: {
            id: userId
        }
    };
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1hr" });
}

export default jwtGenerator;