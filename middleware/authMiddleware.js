// Import JWT library for token verification
import jwt from "jsonwebtoken";

// Middleware to protect routes - checks for valid JWT token
export const protect = (req, res, next) => {
  // Extract token from the "Authorization" header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Log the received token (for debugging - optional)
  console.log("Token received:", token);

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded payload (for debugging - optional)
    console.log("Decoded token:", decoded);

    // Attach user data to request object for further use in routes
    req.user = decoded;

    // Proceed to the next middleware/route
    next();

  } catch (error) {
    // If token is invalid or expired, deny access
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
