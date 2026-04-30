const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Akses ditolak, silakan login dulu" });
    }

    try {
        const decoded = jwt.verify(token, "RAHASIA_KUNCI");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token tidak valid" });
    }
};