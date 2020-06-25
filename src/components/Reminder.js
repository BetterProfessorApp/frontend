import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";

const Reminder = (props) => {
  const { studnets } = props;
  const [projectsDue, setProjectsDue] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const userID = useSelector((state) => state.userReducer.id);
  useEffect(() => {
    console.log(userID);
    axiosWithAuth()
      .get(`/api/users/teacher/${userID}/students/projects`)
      .then((res) => {
        console.log(res.data);

        const dueProjectCheckList = res.data.filter((project) => {
          return project.teacher_id == userID;
        });
        const dueProject = getProjetDue(dueProjectCheckList);
        console.log(dueProject);
        setProjectsDue(dueProject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const getProjetDue = (projects) => {
    const projectsDueInAWeek = projects.filter((project) => {
      return calculateDate(project.due_date) <= 7;
    });
    return projectsDueInAWeek;
  };

  const calculateDate = (dueDate) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const formatToday = mm + "/" + dd + "/" + yyyy;
    console.log(formatToday);

    let dueDateArray = dueDate.split("/");
    if (dueDateArray[0] < 10) {
      dueDateArray[0] = "0" + dueDateArray[0];
    }
    if (dueDateArray[1] < 10) {
      dueDateArray[1] = "0" + dueDateArray[1];
    }
    const formatDueDate =
      dueDateArray[0] + "/" + dueDateArray[1] + "/" + dueDateArray[2];
    console.log(formatDueDate);

    return Math.round(
      (parseDate(formatDueDate) - parseDate(formatToday)) /
        (1000 * 60 * 60 * 24)
    );
  };

  const parseDate = (str) => {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  };
  //   return <>{projectsDue.length !== 0 && projectsDue[0].project_name}</>;
  return (
    <>
      {projectsDue.length !== 0 &&
        projectsDue.map((project, index) => {
          return (
            <div key={index}>
              <Link to={`/student/${project.student_id}`}>
                <p>Project Name: {project.project_name}</p>
                <p>Stduent Name: {project.name}</p>
                <p>Due Date: {project.due_date}</p>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Reminder;
