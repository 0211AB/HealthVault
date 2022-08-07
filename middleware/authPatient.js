const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(":")[1];

    if (!token) return res.status(403).json({ Error: "Authorization Revoked . Please provide valid auth-headers" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(403).json({ Error: "Token Error" });

    const patient = await Patient.findOne({ email: decoded.email },{_id: 0,password:0,tokens:0});
    req.patient = patient;

    next();
  } catch (error) {
    return res.status(403).json({ Error: "Authorization Revoked . Please provide valid auth-headers" });
  }
};