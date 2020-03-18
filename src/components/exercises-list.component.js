import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Exercise({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}> edit</Link> |
        <a
          href="#"
          onClick={() => {
            deleteExercise(exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
}

class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(error => console.log("error", error));
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
export default ExercisesList;
