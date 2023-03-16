const jwt = require("jsonwebtoken");
const Patient = require("./../models/patientSchema");

const authenticatePatient = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    const verifyToken = jwt.verify(
      token,
      "VANAMGANGIREDDYKATAMVIJAYADURGAMANITEJA"
    );

    const rootUser = await Patient.findOne({
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
    res.status(401).send("Unauthorized access: No token provided");
  }
};
module.exports = authenticatePatient;
