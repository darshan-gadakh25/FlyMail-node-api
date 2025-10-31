import jwt  from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorizes" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userPayload = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

const generateToken = (userDate) => {
  return jwt.sign(userDate, process.env.JWT_SECRET);
};

export default generateToken ;
