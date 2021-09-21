import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

const initialState = {
  courseName: "",
  code: "",
  passmark: 0,
  lecturer: "",
  subjects: [],
  options: [],
  selectedSubjects: [],
};

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubjectSelect = this.onSubjectSelect.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get("http://localhost:8080/subject/").then((response) => {
      this.setState({ subjects: response.data.data }, () => {
        let data = [];

        this.state.subjects.map((item, index) => {
          let subject = {
            value: item._id,
            label: item.name,
          };
          data.push(subject);
        });

        this.setState({ options: data });
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubjectSelect(e) {
    this.setState({ selectedSubjects: e ? e.map((item) => item.value) : [] });
  }

  onSubmit(e) {
    e.preventDefault();
    let course = {
      name: this.state.courseName,
      code: this.state.code,
      passmark: this.state.passmark,
      lecture: this.state.lecturer,
      subjects: this.state.selectedSubjects,
    };
    console.log("Course Data", course);
    axios
      .post("http://localhost:8080/course/create", course)
      .then((response) => {
        alert("Data inserted successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Create Course</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="subjectName" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="courseName"
              value={this.state.courseName}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectName" className="form-label">
              Course Code
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="code"
              value={this.state.code}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectName" className="form-label">
              Course Passmark
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              name="passmark"
              value={this.state.passmark}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectName" className="form-label">
              Lecturer
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="lecturer"
              value={this.state.lecturer}
              onChange={this.onChange}
            />
          </div>

          <Select
            options={this.state.options}
            onChange={this.onSubjectSelect}
            className="basic-multi-select"
            isMulti
          />
          <br></br>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateCourse;
