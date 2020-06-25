import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
      })
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
    <>
      {editToggle ? (
        <>
          <form onSubmit={onSubmit}>
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
            <button onClick={cancelEdit}>cancel</button>
          </form>
        </>
      ) : (
        <>
          {" "}
          <p>Project Name:&nbsp;{project.project_name}</p>
          <p>Project Type:&nbsp;{project.project_type}</p>
          <p>Due Date(mm/dd/yyyy):&nbsp; {project.due_date}</p>
          <p>Description:&nbsp;{project.desc}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditToggle(true);
            }}
          >
            Edit
          </button>
          <button onClick={completedHander}>Completed</button>
        </>
      )}
    </>
  );
};

export default Project;
