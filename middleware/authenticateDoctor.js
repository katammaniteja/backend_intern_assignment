const jwt = require("jsonwebtoken");
const Doctor = require("./../models/doctorSchema");

const authenticateDoctor = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    const verifyToken = jwt.verify(
      token,
      "VANAMGANGIREDDYKATAMVIJAYADURGAMANITEJA"
    );
    const rootUser = await Doctor.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.id = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
module.exports = authenticateDoctor;
