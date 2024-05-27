const express = require("express");
const router = require('express').Router();
const mongoose = require("mongoose");

const Students = require("../models/Students.model");
const Cohorts = require("../models/Cohort.model");


router.get('/cohorts', (req, res) => {
  Cohorts.find()
  .then((allCohorts) => res.json(allCohorts))
  .catch((err) => {
    console.log("Error while getting the cohorts", err);
    res.status(500).json({ message: "Error while getting the cohorts" });
  });
});
  
router.post('/cohorts', (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  } = req.body;
  
  Cohorts.create({
    inProgress,
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours 
  })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the cohort", err);
      res.status(500).json({ message: "Error while creating the cohort" });
    });
});

router.put('/cohorts/:cohortsId', (req, res) => {
  const { cohortsId } = req.params;
       
  if (!mongoose.Types.ObjectId.isValid(cohortsId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
       
  Cohorts.findByIdAndUpdate(cohortsId, req.body, { new: true })
    .then((updatedCohorts) => res.json(updatedCohorts))
    .catch((err) => {
      console.log("Error while updating the cohorts list", err);
      res.status(500).json({ message: "Error while updating the cohorts list" });
  });
});

router.delete('/cohorts/:cohortsId', (req, res, next) => {
  const { cohortsId } = req.params;
       
  if (!mongoose.Types.ObjectId.isValid(cohortsId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
       
  Project.findByIdAndDelete(cohortsId)
    .then(() => res.json({ message: `Cohort with ${cohortsId} is removed successfully.` }))
    .catch((err) => {
      console.log("Error while deleting the cohort", err);
      res.status(500).json({ message: "Error while deleting the cohort" });
  });
});
  
module.exports = router;