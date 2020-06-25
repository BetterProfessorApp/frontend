import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useSelector } from "react-redux";
import styled from "styled-components";
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
    <FormContainer>
      <StyledForm onSubmit={onSubmit}>
        <StyledHeading>Add a Project</StyledHeading>
        <label>
          Project Name:{" "}
          <input
            type="text"
            name="project_name"
            value={project.project_name}
            onChange={projectInputChange}
          />
        </label>
        <label>
          Project Type:{" "}
          <input
            type="text"
            name="project_type"
            value={project.project_type}
            onChange={projectInputChange}
          />
        </label>
        <label>
          Due Date (mm/dd/yyyy):{" "}
          <input
            type="text"
            name="due_date"
            value={project.due_date}
            onChange={projectInputChange}
          />
        </label>
        <label>
          Description:{" "}
          <input
            type="text"
            name="desc"
            value={project.desc}
            onChange={projectInputChange}
          />
        </label>
        <StyledSubmit type="submit">Submit</StyledSubmit>
        <StyledSubmit
          onClick={(e) => {
            e.preventDefault();
            history.push(`/student/${id}`);
          }}
        >
          Cancel
        </StyledSubmit>
      </StyledForm>
    </FormContainer>
  );
};

export default AddProject;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Slab", serif;
`;
const StyledForm = styled.form`
  width: 70%;
  border-radius: 20px;
  box-shadow: 1px 1px 5px black;
  margin-top: 5%;
  box-sizing: border-box;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    color: #0a2738;
  }
  input {
    border: 1px solid #66889c;
    border-radius: 2px;
  }
  * {
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }
`;
const StyledHeading = styled.h2`
  color: #2196f3;
`;
const StyledSubmit = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 10px !important;
  border: none;
  padding: 0.5rem 3rem;
  &:hover {
    background-color: lightcyan;
    color: black;
    box-shadow: 2px 2px 3px black;
  }
`;
