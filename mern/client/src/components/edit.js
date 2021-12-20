import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// This will require to npm install axios
import axios from "axios";

export default function Edit() {
  const [form, setForm] = useState({
    person_name: "",
    person_position: "",
    person_level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/record/" + params.id)
      .then((response) => {
        setForm({
          person_name: response.data.person_name,
          person_position: response.data.person_position,
          person_level: response.data.person_level,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);

  // These methods will update the state properties.

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      person_name: form.person_name,
      person_position: form.person_position,
      person_level: form.person_level,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + params.id,
        newEditedperson
      )
      .then((res) => console.log(res.data));

    navigate("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            value={form.person_name}
            onChange={(e) => updateForm({ person_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
          <input
            type="text"
            className="form-control"
            value={form.person_position}
            onChange={(e) => updateForm({ person_position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={form.person_level === "Intern"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={form.person_level === "Junior"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={form.person_level === "Senior"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
