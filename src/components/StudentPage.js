import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Project from "./Project";

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
    <>
      <button onClick={addProjectHandler}>Add a Project</button>
      <button onClick={editStudentHandler}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
      {editToggle ? (
        <>
          <form onSubmit={onEditSubmit}>
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
          </form>
        </>
      ) : (
        <>
          <p>Name:&nbsp;{student.name}</p>
          <p>Email:&nbsp;{student.email}</p>
          <p>Subject:&nbsp;{student.subject}</p>
        </>
      )}

      {projects && (
        <>
          <div className="projectSection">
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
          </div>
        </>
      )}
    </>
  );
};

export default StudentPage;
