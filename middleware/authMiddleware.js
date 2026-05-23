const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ msg: "Akses ditolak, silakan login dulu" });
  }

  const token = authorizationHeader.startsWith("Bearer ")
    ? authorizationHeader.slice(7).trim()
    : authorizationHeader;

  try {
    const decoded = jwt.verify(token, "RAHASIA_KUNCI");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token tidak valid" });
  }
};
