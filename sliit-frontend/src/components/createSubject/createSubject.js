import React, { Component } from "react";
import axios from "axios";

const initialState = {
  subjectName: "",
  description: "",
  amount: 0,
};

class CreateSubject extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let subject = {
      name: this.state.subjectName,
      description: this.state.description,
      amount: this.state.amount,
    };
    console.log("Sunject Data", subject);
    axios
      .post("http://localhost:8080/subject/create", subject)
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
        <h1>Create Subject</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="subjectName" className="form-label">
              Subject Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="subjectName"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="subjectAmount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              name="amount"
              value={this.state.amount}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateSubject;
