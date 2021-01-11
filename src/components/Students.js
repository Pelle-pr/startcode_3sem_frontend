import React, { useState, useEffect } from "react";
import exampleFacade from "../facades/exampleFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import printError from "../utils/error";

export default function Students() {
  const [students, setStudents] = useState([]);
  let { path, url } = useRouteMatch();
  const [error, setError] = useState("");

  useEffect(() => {
    exampleFacade
      .getStudents()
      .then((res) => setStudents([...res]))
      .catch((promise) => printError(promise, setError));
  }, []);

  return (
    <div className="container">
      <p style={{ color: "red" }}>{error}</p>
      <div className="row">
        <div className="col-6">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.name}>
                  <td>{student.name}</td>
                  <td>
                    <Link to={`${url}/${student.name}`}>
                      <button>more info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <Switch>
            <Route path={`${path}/:name`}>
              <Info students={students} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

const Info = ({ students }) => {
  let { name } = useParams();
  let student = students.find((x) => x.name === name);

  return (
    <React.Fragment>
      <h2>{student.name}</h2>
      <img src={student.image} alt="" style={{ width: "150px" }}></img>
      <p>Gender: {student.gender}</p>
      <p>
        Date of Birth:{" "}
        {student.dateOfBirth !== "" ? `${student.dateOfBirth}` : "Unknown"}
      </p>
      <p>Species: {student.species}</p>
      <p>House: {student.house}</p>
    </React.Fragment>
  );
};
