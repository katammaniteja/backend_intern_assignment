const express = require("express");
const router = express.Router();
const authenticateDoctor = require("./../middleware/authenticateDoctor");
const authenticatePatient = require("./../middleware/authenticatePatient");
const Doctor = require("./../models/doctorSchema");
const Patient = require("./../models/patientSchema");

router.get("/filled-slots", authenticateDoctor, async (req, res) => {
  try {
    const doctor_id = req.id;
    const doctor = await Doctor.findById(doctor_id);
    const filled_slots = doctor.filled_slots;
    res.json(filled_slots);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/slot-allotment", authenticatePatient, async (req, res) => {
  try {
    const patient_id = req.id;
    const patient = await Patient.findById(patient_id);
    const required_specialization = req.body.specialization;
    const required_date = req.body.date;
    const doctors = await Doctor.find({
      specialization: required_specialization,
    });
    for (const doctor of doctors) {
      const filled_slots = doctor.filled_slots;
      let is_slot_available = true;
      for (const filled_slot of filled_slots) {
        if (filled_slot.date === required_date) is_available = false;
      }
      if (is_slot_available) {
        doctor.filled_slots = doctor.filled_slots.concat({
          date: required_date,
          name: patient.name,
          contact: patient.contact,
          email: patient.email,
        });
        await doctor.save();
        res.status(200).json({
          message: "Your appointment is successful",
          doctor_name: doctor.name,
          doctor_number: doctor.contact,
        });
      }
    }
    res.send({
      message: "The slot is not available. Please choose another date",
    });
  } catch (error) {}
});

module.exports = router;
