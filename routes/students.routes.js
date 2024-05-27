const express = require("express");
const router = require('express').Router();
const mongoose = require("mongoose");

const Students = require("../models/Students.model");
const Cohorts = require("../models/Cohort.model");

router.get('/students', (req, res) => {
  Students.find()
    .populate('cohorts')
    .then((allStudents) => res.json(allStudents))
    .catch((err) => {
      console.log("Error while getting the students", err);
      res.status(500).json({ message: "Error while getting the students" });
  });
});

router.get('/students/:studentsId', (req, res) => {
  const { studentsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentsId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Students.find(studentsId)
    .populate('cohorts')
    .then((students) => res.status(200).json(students))
    .catch((err) => {
      console.log("Error while getting the single students", err);
      res.status(500).json({ message: "Error while getting the single students" });
  });
});

router.post('/students', (req, res) => {
  const { 
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  } = req.body;

  Students.create({ 
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating student", err);
      res.status(500).json({ message: "Error while creating the student" });
  });
});

router.put('/students/:studentsId', (req, res) => {
  const { studentsId } = req.params;
     
  if (!mongoose.Types.ObjectId.isValid(studentsId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
     
  Students.findByIdAndUpdate(studentsId, req.body, { new: true })
    .then((updatedStudents) => res.json(updatedStudents))
    .catch((err) => {
      console.log("Error while updating the students list", err);
      res.status(500).json({ message: "Error while updating the students list" });
  });
});

router.delete('/students/:studentsId', (req, res) => {
  const { studentsId } = req.params;
     
  if (!mongoose.Types.ObjectId.isValid(studentsId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
     
  Project.findByIdAndDelete(studentsId)
    .then(() => res.json({ message: `Student with ${studentsId} is removed successfully.` }))
    .catch((err) => {
      console.log("Error while deleting the student", err);
      res.status(500).json({ message: "Error while deleting the student" });
  });
});

module.exports = router;