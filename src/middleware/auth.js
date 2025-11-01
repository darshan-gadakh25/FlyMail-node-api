import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database to ensure they still exist and get latest status
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    if (user.status !== "active") {
      return res.status(403).json({ error: "Account is inactive" });
    }

    // Set both userPayload (from token) and user (from database)
    req.userPayload = decoded;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Role-based access control middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    next();
  };
};

const generateToken = (userDate) => {
  return jwt.sign(userDate, process.env.JWT_SECRET);
};

export { authMiddleware, requireRole };
export default generateToken;
