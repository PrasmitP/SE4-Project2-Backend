const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.department || !req.body.courseNumber || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Course
  const course = {
    department: req.body.department,
    courseNumber: req.body.courseNumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description
  };
  // Save Course in the database
  Course.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    });
};

// Retrieve all Courses from the database
exports.findAll = (req, res) => {
  const department = req.query.department;
  var condition = department ? { department: department } : null;
  Course.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses.",
      });
    });
};

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Course with id=" + id,
      });
    });
};

// Update a Course by the courseNumber in the request
exports.update = (req, res) => {
  const courseNumber = req.params.courseNumber;
  Course.update(req.body, {
    where: { courseNumber: courseNumber },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with number=${courseNumber}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Course with number=" + courseNumber,
      });
    });
};
// Delete a Course with the specified courseNumber in the request
exports.delete = (req, res) => {
  const courseNumber = req.params.courseNumber;
  Course.destroy({
    where: { courseNumber: courseNumber },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with courseNumber=${courseNumber}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Course with number=" + courseNumber,
      });
    });
};
// Delete all Courses from the database. CHANGE THIS
exports.deleteAll = (req, res) => {
  const department = req.query.department;
  var condition = department ? { department: department } : null;
  Course.destroy({
    where: { where: condition },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
