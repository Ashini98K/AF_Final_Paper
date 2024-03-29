const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

module.exports = function () {
  router.post("/create", controller.createCourse);
  router.get("/", controller.getCourse);
  router.get("/:id", controller.getSubjectForCourse);
  router.get("/amount/:id", controller.calculateAmount);
  router.get("/subject/:subjects", controller.getCourseForSubject);
  return router;
};
