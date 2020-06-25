import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import jwt_decode from "jwt-decode";

const AddProject = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const tokenObject = jwt_decode(token);
  const userID = tokenObject.teacher_id;
  const history = useHistory();

  const [project, setProject] = useState({
    project_name: "",
    student_id: id,
    project_type: "",
    desc: "",
    due_date: "",
    completed: false,
  });

  const projectInputChange = (evt) => {
    const { name, value } = evt.target;
    setProject({ ...project, [name]: value });
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(project);
    axiosWithAuth()
      .post(`/api/users/teacher/${userID}/students/projects`, project)
      .then((res) => {
        history.push(`/student/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h2>Add a Project</h2>
      <form onSubmit={onSubmit}>
        <label>Project Name:</label>
        <input
          type="text"
          name="project_name"
          value={project.project_name}
          onChange={projectInputChange}
        />
        <label>Project Type:</label>
        <input
          type="text"
          name="project_type"
          value={project.project_type}
          onChange={projectInputChange}
        />
        <label>Due Date:</label>
        <input
          type="text"
          name="due_date"
          value={project.due_date}
          onChange={projectInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="desc"
          value={project.desc}
          onChange={projectInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddProject;
