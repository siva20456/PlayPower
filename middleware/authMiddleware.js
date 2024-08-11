const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token.split(" ")[1]
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  jwt.verify(token,'SECRET', (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.username;
    next();
  });
};
