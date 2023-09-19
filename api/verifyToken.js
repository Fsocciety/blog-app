const jwt = require("jsonwebtoken");

// Middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Assuming you send the token in the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded; // Set the authenticated user in the request object
    console.log("Correct token");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
