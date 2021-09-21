const Course = require("../models/course.model");
const axios = require("axios");

const createCourse = async (req, res) => {
  if (req.body) {
    const course = new Course(req.body);
    await course
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getCourse = async (req, res) => {
  await Course.find({})
    .populate("subjects", "name description amount")
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getSubjectForCourse = async (req, res) => {
  if (req.params && req.params.id) {
    await Course.findById(req.params.id)
      .populate("subjects", "name description amount")
      .then((data) => {
        res.status(200).send({ subjects: data.subjects });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const calculateAmount = async (req, response) => {
  if (req.params && req.params.id) {
    const course = await Course.findById(req.params.id).populate(
      "subjects",
      "amount"
    );

    console.log("Data retrived");
    console.log(course);
    console.log("calling api to calculate total amount");

    let totalAmount = 0;
    // if (course.subjects.length > 0) {
    //   course.subjects.map((subject) => {
    //     totalAmount += subject.amount;
    //   });
    // }
    // res.status(200).send({ totalAmount: totalAmount });

    axios
      .post(
        "http://localhost:8081/calculation",
        { subjects: course.subjects },
        { content: "application/json" }
      )
      .then((res) => {
        console.log("reponse from backend");
        totalAmount = res.data;
        console.log(totalAmount);
        console.log("sending response to frontend");

        response.status(200).send({ totalAmount: totalAmount });
      });
  }
};

const getCourseForSubject = async (req, res) => {
  if (req.params && req.params.subjects) {
    const subject = req.params.subjects;
    await Course.find({ subjects: subject })
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = {
  createCourse,
  getCourse,
  getSubjectForCourse,
  calculateAmount,
  getCourseForSubject,
};
