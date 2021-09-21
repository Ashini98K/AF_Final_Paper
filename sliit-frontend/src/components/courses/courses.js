import React, { Component } from "react";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/course/").then((response) => {
      this.setState({ courses: response.data.data });
    });
  }

  navigateToSubjects(e, courseId) {
    window.location = `/${courseId}`;
  }

  render() {
    return (
      <div className="container">
        <h1>Courses</h1>
        {this.state.courses.length > 0 &&
          this.state.courses.map((item, index) => (
            <div key={index} className="card text-dark bg-warning mb-3">
              <div
                className="card-body"
                onClick={(e) => this.navigateToSubjects(e, item._id)}
              >
                <h5>Course Name: {item.name}</h5>
                <h6>Lecturer: {item.lecture}</h6>
                <h6>Course Code: {item.code}</h6>
                <h6>Pass Mark: {item.passmark}</h6>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Courses;
