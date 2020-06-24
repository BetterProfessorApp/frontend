import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components'

const StudentPage = (props) => {
  const { id } = useParams();
  console.log(id);
  const student = props.location.state;
  console.log(student);

  return (
    <StudentPageContainer>
      <StudentPageDiv>
        {student && (
          <StudentInfoDiv>
            <p><LabelSpan>Name:</LabelSpan> {student.name}</p>
            <p><LabelSpan>Email:</LabelSpan> {student.email}</p>
            <p><LabelSpan>Subject:</LabelSpan> {student.subject}</p>
          </StudentInfoDiv>
        )}

        {student && student.projects && (
          <ProjectDisplay>
            <div className="projectSection">
              {student[0].projects.map((project) => {
                return (
                  <ProjectDiv>
                    <p><LabelSpan>Project: </LabelSpan>{project.type}</p>
                    <p><LabelSpan>Date: </LabelSpan>{project.date}</p>
                    <p><LabelSpan>Description: </LabelSpan>{project.description}</p>
                  </ProjectDiv>
                );
              })}
            </div>
          </ProjectDisplay>
        )}

        <ButtonContainer>
          <StyledButton>Add a Project</StyledButton>
          <StyledButton>Edit</StyledButton>
          <StyledButton>Delete</StyledButton>
        </ButtonContainer>
      </StudentPageDiv>
    </StudentPageContainer>
  );
};

export default StudentPage;

const StudentPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StudentPageDiv = styled.div`
  background-color: lightgoldenrodyellow;
  padding: 3%;
  width: 90%;
  border-radius: 5px;
  box-shadow: 0 0 2px black;
  margin: 2%;
`
const StudentInfoDiv = styled.div`
  box-shadow: 0 0 1px black;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
`
const LabelSpan = styled.span`
  color: gray;
`
const ProjectDisplay = styled.div`
  margin-top: 1%;
  border-radius: 5px;
  padding: 1%;
`
const ProjectDiv = styled.div`
  margin: 1%;
  padding: 1.5% 3%;
  /* background-color: red; */
  box-shadow: 0 0 1px black;
  border-radius: 5px;
`
const StyledButton = styled.button`
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
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`