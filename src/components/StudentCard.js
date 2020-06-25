import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import jwt_decode from "jwt-decode";

const StudentCard = (props) => {
  const id = props.student.id;
  const token = localStorage.getItem("token");
  const tokenObject = jwt_decode(token);
  const userID = tokenObject.teacher_id;
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
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
        console.log(err);
      });
  }, [refresh]);
  return (
    <>
      <p>Name:&nbsp;{props.student.name}</p>
      <p>Email:&nbsp;{props.student.email}</p>
      <p>Subject:&nbsp;{props.student.subject}</p>
      <div className="projectSection">
        {projects.map((project, index) => {
          return (
            <div key={index}>
              <p>Project Name:&nbsp;{project.project_name}</p>
              <p>Due Date:&nbsp; {project.due_date}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentCard;
