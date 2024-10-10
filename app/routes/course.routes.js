module.exports = (app) => {
  const course = require("../controllers/course.controller.js");
  var router = require("express").Router();

  // Create a new course
  router.post("/", course.create);

  // Retrieve all coursea
  router.get("/", course.findAll);

  // Retrieve all course for department
  router.get("/department/:department", course.findAll);

  // Retrieve a single Course with id
  router.get("/:idcourse", course.findOne);

  // Update a Course with id
  router.put("/:idcourse", course.update);

  // Delete a Course with id
  router.delete("/:idcourse", course.delete);

  // Delete all course
  router.delete("/", course.deleteAll);

  app.use("/course", router);
};
