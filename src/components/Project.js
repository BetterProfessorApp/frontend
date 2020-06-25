import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const Project = (props) => {
  const { id, userID, project, setRefresh, refresh } = props;
  const history = useHistory();
  //const [refresh, setRefresh] = useState(true);
  const [editProject, setEditProject] = useState({
    project_name: project.project_name,
    due_date: project.due_date,
    desc: project.desc,
    project_type: project.project_type,
    teacher_id: JSON.stringify(userID),
    student_id: id,
  });
  const [editToggle, setEditToggle] = useState(false);

  const editProjectInputChange = (evt) => {
    const { name, value } = evt.target;
    setEditProject({ ...editProject, [name]: value });
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log("edited project", editProject);
    axiosWithAuth()
      .put(
        `/api/users/teacher/${userID}/students/projects/${project.id}`,
        editProject
      )
      .then((res) => {
        setEditToggle(false);
        setRefresh(!refresh);
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelEdit = (e) => {
    setEditToggle(false);
  };

  const completedHander = (e) => {
    e.preventDefault();
    console.log(project);
    axiosWithAuth()
      .delete(`/api/users/teacher/${userID}/students/projects/${project.id}`)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        history.push(`/student/${id}`);
      });
  };

  return (
    <ProjectContainer>
      {editToggle ? (
        <>
          <EditForm onSubmit={onSubmit}>
            <label>Project Name:</label>
            <input
              type="text"
              name="project_name"
              value={editProject.project_name}
              onChange={editProjectInputChange}
            />
            <label>Project Type:</label>
            <input
              type="text"
              name="project_type"
              value={editProject.project_type}
              onChange={editProjectInputChange}
            />
            <label>Due Date:</label>
            <input
              type="text"
              name="due_date"
              value={editProject.due_date}
              onChange={editProjectInputChange}
            />
            <label>Description:</label>
            <input
              type="text"
              name="desc"
              value={editProject.desc}
              onChange={editProjectInputChange}
            />
            <button type="submit">Submit</button>
            <button onClick={cancelEdit}>Cancel</button>
          </EditForm>
        </>
      ) : (
        <>
          {" "}
          <p>Project Name:&nbsp;{project.project_name}</p>
          <p>Project Type:&nbsp;{project.project_type}</p>
          <p>Due Date(mm/dd/yyyy):&nbsp; {project.due_date}</p>
          <p>Description:&nbsp;{project.desc}</p>
          <ButtonContainer>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditToggle(true);
              }}
            >
              Edit Project
            </button>
            <button onClick={completedHander}>Completed</button>
          </ButtonContainer>
        </>
      )}
    </ProjectContainer>
  );
};

export default Project;

const ProjectContainer = styled.div`
  box-sizing: border-box;
  width: 60%;
  padding: 2%;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px black;
  margin: 2% 0;
  align-items: center;
`;
const EditForm = styled.form`
display: flex;
flex-direction: column;


label {
  margin-top: 5%;
}
input {
  margin-bottom: 5%;
}
button {
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: #2196f3;
   color: white;
   border-radius: 10px !important;
   font-size: 0.8rem;
   border: none;
   padding: 0.5rem 3rem;
letter-spacing: 0.2rem;
&:hover {
  background-color: lightcyan;
  color: black;
  box-shadow: 2px 2px 3px black;
}
`;
const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 4%;
  margin-bottom: 4%;
  margin-left: 10%;
  button {
    background-color: #2196f3;
    color: white;
    border-radius: 10px !important;
    font-size: 1rem;
    border: none;
    padding: 0.5rem 3rem;
    letter-spacing: 0.1rem;
    &:hover {
      background-color: lightcyan;
      color: black;
      box-shadow: 2px 2px 3px black;
    }
  }
`;
