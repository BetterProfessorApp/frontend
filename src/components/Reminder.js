import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Reminder = (props) => {
  const { studnets } = props;
  const [projectsDue, setProjectsDue] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const token = localStorage.getItem("token");
  const tokenObject = jwt_decode(token);
  const userID = tokenObject.teacher_id;
  useEffect(() => {
    //console.log(userID);
    axiosWithAuth()
      .get(`/api/users/teacher/${userID}/students/projects`)
      .then((res) => {
        //  console.log(res.data);

        const dueProjectCheckList = res.data.filter((project) => {
          return project.teacher_id == userID;
        });
        const dueProject = getProjetDue(dueProjectCheckList);
        //  console.log(dueProject);
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
    // console.log(formatToday);

    let dueDateArray = dueDate.split("/");
    if (dueDateArray[0] < 10) {
      dueDateArray[0] = "0" + dueDateArray[0];
    }
    if (dueDateArray[1] < 10) {
      dueDateArray[1] = "0" + dueDateArray[1];
    }
    const formatDueDate =
      dueDateArray[0] + "/" + dueDateArray[1] + "/" + dueDateArray[2];
    // console.log(formatDueDate);

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
    <MainContainer>
      {projectsDue.length !== 0 &&
        projectsDue.map((project, index) => {
          return (
            <ProjectContainer key={index}>
              <ProjectContainerLink
                to={`/student/${project.student_id}`}
                style={{ textDecoration: "none" }}
              >
                <p>
                  <LabelSpan>Project Name: </LabelSpan>
                  {project.project_name}
                </p>
                <p>
                  <LabelSpan>Student Name: </LabelSpan>
                  {project.name}
                </p>
                <p>
                  <LabelSpan>Due Date: </LabelSpan>
                  {project.due_date}
                </p>
              </ProjectContainerLink>
            </ProjectContainer>
          );
        })}
    </MainContainer>
  );
};

export default Reminder;

const MainContainer = styled.div`
  box-sizing: border-box;
  margin-top: 2%;
  width: 97%;
  box-shadow: 0 0 3px black;
  border-radius: 5px;
  padding: 1%;
  background-color: lightgray;
`;
const ProjectContainerLink = styled(Link)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 2px black;
  color: black;
  &:hover {
    background-color: #00ffff;
  }
`;
const LabelSpan = styled.span`
  color: gray;
`;
const ProjectContainer = styled.div`
  margin-top: 1%;
  margin-bottom: 1%;
`;
