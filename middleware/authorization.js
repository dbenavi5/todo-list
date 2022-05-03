import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const authorization = async (request, response, next) => {
  try {
    const jwtToken = request.header("token");
    if (!jwtToken) {
      return response.status(403).json("Not Authorize");
    }

    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
    request.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    return response.status(403).json("Not Authorize");
  }
};

export default authorization;
