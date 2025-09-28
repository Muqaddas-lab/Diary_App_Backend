// import jwt from "jsonwebtoken";
// export const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized access" });
//   }
//   console.log("Token received:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.user = decoded;
//     next();

//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };




import jwt from "jsonwebtoken";
import User from "../models/User.js"; // 👈 Make sure this path is correct

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password"); // fetch full user

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // 👈 Safe: Now req.user.id is guaranteed
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
