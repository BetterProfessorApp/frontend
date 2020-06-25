import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Project from "./Project";
import styled from "styled-components";

const StudentPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const tokenObject = jwt_decode(token);
  const userID = tokenObject.teacher_id;
  const [student, setStudent] = useState([]);
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [editStudent, setEditStudent] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/users/teacher/${userID}/students/${id}`)
      .then((res) => {
        setStudent(res.data[0]);
        setEditStudent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh, id, userID]);

  useEffect(() => {
    //console.log(userID);
    axiosWithAuth()
      .get(`/api/users/teacher/${userID}/students/projects`)
      .then((res) => {
        console.log(res.data);

        setProjects(
          res.data.filter((project) => {
            return project.student_id == id;
          })
        );
      })
      .catch((err) => {
        setProjects([]);
        console.log(err);
      });
  }, [refresh]);
  const addProjectHandler = (e) => {
    e.preventDefault();
    history.push(`/student/addproject/${id}`);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`api/users/teacher/${userID}/students/${id}`)
      .then((res) => {
        history.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editStudentHandler = (e) => {
    e.preventDefault();
    setEditToggle(true);
  };

  const EditStudentChange = (e) => {
    e.preventDefault();
    setEditStudent({
      ...editStudent,
      [e.target.name]: e.target.value,
    });
  };
  const onEditSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/users/teacher/${userID}/students/${id}`, editStudent)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditToggle(false);
        setRefresh(!refresh);
      });
  };
  const cancelEdit = (e) => {
    setEditToggle(false);
  };
  return (
    <StudentPageContainer>
      <ButtonContainer>
        <button onClick={addProjectHandler}>Add a Project</button>
        <button onClick={editStudentHandler}>Edit Student Info</button>
        <button onClick={deleteHandler}>Delete Student</button>
      </ButtonContainer>
      {editToggle ? (
        <div>
          <EditForm onSubmit={onEditSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editStudent.name}
              onChange={EditStudentChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={editStudent.email}
              onChange={EditStudentChange}
            />
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={editStudent.subject}
              onChange={EditStudentChange}
            />
            <button type="submit">Submit</button>
            <button onClick={cancelEdit}>Cancel</button>
          </EditForm>
        </div>
      ) : (
        <StudentInfo>
          <p>
            <label>Name:&nbsp;</label>
            {student.name}
          </p>
          <p>
            <label>Email:&nbsp;</label>
            {student.email}
          </p>
          <p>
            <label>Subject:&nbsp;</label>
            {student.subject}
          </p>
        </StudentInfo>
      )}

      {projects && (
        <>
          <SpaceSaver className="projectSection">
            {projects.map((project, index) => {
              return (
                <Project
                  id={id}
                  userID={userID}
                  project={project}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  key={index}
                />
              );
            })}
          </SpaceSaver>
        </>
      )}
    </StudentPageContainer>
  );
};

export default StudentPage;

const StudentPageContainer = styled.div`
  width: 92%;
  margin: auto;
  margin-top: 4%;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 4%;
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
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top:10%;

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
const StudentInfo = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 2px black;
  color: black;
  label {
    color: gray;
  }
`;
const SpaceSaver = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
