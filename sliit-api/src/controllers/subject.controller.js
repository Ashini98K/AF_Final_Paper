const Subject = require("../models/subject.model");

const createSubject = async (req, res) => {
  if (req.body) {
    const subject = new Subject(req.body);
    await subject
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getSubjects = async (req, res) => {
  await Subject.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  createSubject,
  getSubjects,
};
