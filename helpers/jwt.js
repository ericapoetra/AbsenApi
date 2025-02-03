const jwt = require("jsonwebtoken");

let generateToken = (payload) => {
  return jwt.sign(payload, "Komponen11!!", { expiresIn: "365d" });
};

let verifyToken = (payload) => {
  return jwt.verify(payload, "Komponen11!!");
};

module.exports = { generateToken, verifyToken };
