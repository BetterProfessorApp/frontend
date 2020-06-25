import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StudentList = (props) => {
  return (
    <StudentListContainer>
      {props.students.map((student, index) => {
        return (
          <IDKSomeContainer key={index}>
            <StudentContainerLink
              to={{
                pathname: `/student/${student.id}`,
                state: student,
              }}
              style={{ textDecoration: "none" }}
            >
              <p>
                <LabelSpan>Name: </LabelSpan>
                {student.name}
              </p>
              <p>
                <LabelSpan>Email: </LabelSpan>
                {student.email}
              </p>
              <p>
                <LabelSpan>Subject: </LabelSpan>
                {student.subject}
              </p>
            </StudentContainerLink>
          </IDKSomeContainer>
        );
      })}
    </StudentListContainer>
  );
};

export default StudentList;

const StudentListContainer = styled.div`
  box-sizing: border-box;
  margin-top: 2%;
  width: 97%;
  box-shadow: 0 0 3px black;
  border-radius: 5px;
  padding: 1%;
  background-color: lightgray;
`;
const StudentContainerLink = styled(Link)`
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
const IDKSomeContainer = styled.div`
  margin-top: 1%;
  margin-bottom: 1%;
`;
