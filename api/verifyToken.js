const jwt = require("jsonwebtoken");

// Middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Assuming you send the token in the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT); // Replace with your own secret key
    req.user = decoded; // Set the authenticated user in the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
