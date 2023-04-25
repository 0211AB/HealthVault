const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(":")[1].trim();

        if (!token)
            return res
                .status(403)
                .json({
                    Message: "Authorization Revoked . Please provide valid auth-headers",
                });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(403).json({ Message: "Token Error" });

        const user = await User.findOne(
            { Email: decoded.Email },
            { _id: 0, Password: 0, Tokens: 0}
        );
        req.user = user;

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
