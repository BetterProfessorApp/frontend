import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { addStudent } from "../store/actions";
import styled from 'styled-components'

const AddStudent = () => {
  const userID = useSelector((state) => state.userReducer.id);
  const addStudentDispatch = useDispatch();
  const history = useHistory();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    subject: "",
    teacher_id: userID,
  });

  const studentInputChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(student);

    axiosWithAuth()
      .post(`/api/users/teacher/${userID}/students`, student)
      .then((res) => {
        history.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={onSubmit}>
        <StyledHeading>Add a Student</StyledHeading>
        <label>Name:{' '}
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={studentInputChange}
        /></label>

        <label>Email:{' '}
        <input
          type="text"
          name="email"
          value={student.email}
          onChange={studentInputChange}
        /></label>

        <label>Subject:{' '}
        <input
          type="text"
          name="subject"
          value={student.subject}
          onChange={studentInputChange}
        /></label>

        <StyledSubmit id="addButton" type="submit">
          Submit
        </StyledSubmit>

      </StyledForm>
    </FormContainer>
  );
};

export default AddStudent;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Slab", serif;
`;
const StyledForm = styled.form`
  width: 70%;
  /* border: 1px solid black; */
  border-radius: 20px;
  box-shadow: 1px 1px 5px black;
  margin-top: 5%;
  box-sizing: border-box;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    color: #0a2738;
  }
  input {
    border: 1px solid #66889c;
    border-radius: 2px;
  }
  * {
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }
`;
const StyledHeading = styled.h2`
  color: #2196f3;
`;
const StyledSubmit = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 10px !important;
  border: none;
  padding: 0.5rem 3rem;
`;