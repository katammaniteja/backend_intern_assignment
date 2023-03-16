const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorSchema");
const Patient = require("../models/patientSchema");

router.post("/register-doctor", async (req, res) => {
  const { name, email, password, contact, specialization } = req.body;

  try {
    if (!email || !name || !password || !contact || !specialization) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const userExist = await Doctor.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "Email already taken" });
      } else {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({ message: "Registration Succcessful" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login-doctor", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const doctor = await Doctor.findOne({ email: email });
      if (!doctor) {
        res.status(422).json({ error: "Invalid email" });
      } else {
        const isValidUser = await bcrypt.compare(password, doctor.password);
        if (!isValidUser) {
          res.status(422).json({ error: "Invalid password" });
        } else {
          const token = await doctor.generateAuthToken();
          res.status(200).json({ jwttoken: token });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register-patient", async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    if (!email || !name || !password || !contact) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const userExist = await Patient.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "Email already taken" });
      } else {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: "Registration Succcessful" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login-patient", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const patient = await Patient.findOne({ email: email });
      if (!patient) {
        res.status(422).json({ error: "Invalid email" });
      } else {
        const isValidUser = await bcrypt.compare(password, patient.password);
        if (!isValidUser) {
          res.status(422).json({ error: "Invalid password" });
        } else {
          const token = await patient.generateAuthToken();
          res.status(200).json({ jwttoken: token });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
