const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(":")[1].trim();

        if (!token)
            return res
                .status(403)
                .json({
                    Error: "Authorization Revoked . Please provide valid auth-headers",
                });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(403).json({ Error: "Token Error" });

        const doctor = await Doctor.findOne(
            { Email: decoded.email },
            { _id: 0, Password: 0, Tokens: 0, Coordinates: 0 }
        );
        req.doctor = doctor;

        next();
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({
                Error: "Authorization Revoked . Please provide valid auth-headers",
            });
    }
};
