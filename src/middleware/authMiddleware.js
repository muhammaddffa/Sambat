const jwt = require("jsonwebtoken");

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'tokens are required'
    })
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

}

module.exports = {
  accessValidation,
}