const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET || "gshsbsr";

// quickly see what this file exports
module.exports = {
  generateToken,
  authenticate
};

function generateToken(user) {
  console.log(jwtKey);
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtKey, options);
}

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;
      console.log(req.decoded);
      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}
