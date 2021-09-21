import React, { Component } from "react";
import axios from "axios";

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      totalAmount: "",
    };
  }

  componentDidMount() {
    console.log("Course ID :", this.props.match.params.id);
    axios
      .get(`http://localhost:8080/course/${this.props.match.params.id}`)
      .then((response) => {
        console.log("Subjects:", response.data);

        this.setState({ subjects: response.data.subjects });
      })
      .catch((error) => {
        alert(error.message);
      });

    axios
      .get(`http://localhost:8080/course/amount/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ totalAmount: response.data.totalAmount });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  render() {
    return (
      <div className="container">
        <h5>Total Amount : {this.state.totalAmount}</h5>
        <h5>Subjects</h5>
        {this.state.subjects.length > 0 &&
          this.state.subjects.map((item, index) => (
            <div key={index} className="card text-dark bg-light mb-3">
              <div className="card-body">
                <h6>Subject Name:{item.name}</h6>
                <h6>Description:{item.description}</h6>
                <h6>Amount:{item.amount}</h6>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Subjects;
