const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; 
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message:
            "Token is not in the correct format, 'Bearer' prefix is missing",
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is missing after 'Bearer'" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    next(error)
    return res
      .status(401)
      .json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;