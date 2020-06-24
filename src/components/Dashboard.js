import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StudentsList from "./StudentsList";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useSelector } from "react-redux";
import styled from 'styled-components'

const Dashboard = (props) => {
  const userID = useSelector((state) => state.userReducer.id);
  const refresh = useSelector((state) => state.userReducer.refresh);
  const [students, setStudents] = useState([]);
  console.log(userID);
  console.log(refresh);
  useEffect(() => {
    if (userID !== 0) {
      axiosWithAuth()
        .get(`/api/users/teacher/${userID}/students`)
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh]);
  return (
    <DashboardContainer>
      <ReminderDiv className="reminder">
        This is the reminder section, coming soon!
      </ReminderDiv>

      <StudentsListDiv className="students">
        <ButtonLink to="/addstudent">
          Add a Student
        </ButtonLink>
        <StudentsList students={students} />
      </StudentsListDiv>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ReminderDiv = styled.div`
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
  padding: 3%;
  width: 90%;
  margin: 2%;
  box-shadow: 0 0 3px black;
`
const ButtonLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #0A2738;
  padding: .5rem 1.5rem;
  border-radius: 20px;
  box-shadow: 1px 1px 2px black;

  &:hover {
    background-color: #A1A7AA;
    color: black;
  }
`
const StudentsListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`