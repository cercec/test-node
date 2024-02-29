import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
