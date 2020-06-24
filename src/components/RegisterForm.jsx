import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import registerFormSchema from "../validation/registerFormSchema";
import styled from "styled-components";

const initialRegisterFormValues = {
  username: "",
  password: "",
  subject: "",
};
const initialErrorList = {
  username: "",
  password: "",
  subject: "",
};

const RegisterForm = (props) => {
  const [registerFormValues, setRegisterFormValues] = useState(
    initialRegisterFormValues
  );
  const [errorList, setErrorList] = useState(initialErrorList);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const onRegisterTextChange = (evt) => {
    const { name, value } = evt.target;

    Yup.reach(registerFormSchema, name)
      .validate(value)
      .then(() => {
        setErrorList({
          ...errorList,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrorList({
          ...errorList,
          [name]: err.errors[0],
        });
      });

    setRegisterFormValues({ ...registerFormValues, [name]: value });
  };

  const onRegisterSubmit = (evt) => {
    evt.preventDefault();
    console.log(registerFormValues);
    axiosWithAuth()
      .post("/api/auth/register", registerFormValues)
      .then((res) => {
        history.push("./login");
      })
      .catch((err) => {
        console.log(err);
      });
    setRegisterFormValues(initialRegisterFormValues);
  };

  useEffect(() => {
    registerFormSchema.isValid(registerFormValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [registerFormValues]);

  return (
    <FormContainer>
      <StyledForm onSubmit={onRegisterSubmit}>
        <StyledHeading>Register</StyledHeading>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={registerFormValues.username}
            onChange={onRegisterTextChange}
            placeholder="Enter your user name"
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={registerFormValues.password}
            onChange={onRegisterTextChange}
            placeholder="Create a password"
          />
        </label>
        <label>
          Subject:{" "}
          <select
            name="subject"
            value={registerFormValues.subject}
            onChange={onRegisterTextChange}
          >
            <option value=""> -- Please select a Subject -- </option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="art">Art</option>
            <option value="history">History</option>
          </select>
        </label>

        <div className="errors">
          <div className="error">{errorList.username}</div>
          <div className="error">{errorList.password}</div>
          <div className="error">{errorList.subject}</div>
        </div>

        <StyledSubmit
          type="submit"
          name="submit"
          value="Register"
          disabled={disabled}
        />
      </StyledForm>
    </FormContainer>
  );
};

export default RegisterForm;

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
const StyledSubmit = styled.input`
  background-color: #2196f3;
  color: white;
  border-radius: 10px !important;
  border: none;
  padding: 0.5rem 3rem;
`;
