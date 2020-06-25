import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../store/actions";
import { connect } from "react-redux";
import * as Yup from "yup";
import loginFormSchema from "../validation/loginFormSchema";
import styled from "styled-components";

const initialLoginFormValues = {
  username: "",
  password: "",
};
const initialErrorList = {
  username: "",
  password: "",
};

const LoginForm = (props) => {
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const [errorList, setErrorList] = useState(initialErrorList);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const onLoginTextChange = (evt) => {
    const { name, value } = evt.target;
    Yup.reach(loginFormSchema, name)
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
    setLoginFormValues({ ...loginFormValues, [name]: value });
  };
  const onLoginSubmit = (evt) => {
    evt.preventDefault();
    props.login(loginFormValues).then((res) => {
      if (res) {
        history.push("/login");
      } else {
        history.push("/user");
      }
    });
    setLoginFormValues(initialLoginFormValues);
  };
  useEffect(() => {
    loginFormSchema.isValid(loginFormValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [loginFormValues]);

  return (
    <FormContainer>
      <StyledForm onSubmit={onLoginSubmit}>
        <StyledHeading>Login</StyledHeading>
        <label>
          Username:&nbsp;
          <input
            type="text"
            name="username"
            value={loginFormValues.username}
            onChange={onLoginTextChange}
            placeholder="Enter your user name"
          />
        </label>
        <label>
          Password:&nbsp;
          <input
            type="password"
            name="password"
            value={loginFormValues.password}
            onChange={onLoginTextChange}
            placeholder="Enter your password"
          />
        </label>

        <div className="errors">
          <div className="error">{errorList.username}</div>
          <div className="error">{errorList.password}</div>
          <div className="error">{errorList.department}</div>
        </div>

        <StyledSubmit
          type="submit"
          name="submit"
          value="Login"
          disabled={disabled}
        />
      </StyledForm>
    </FormContainer>
  );
};

const mapState = (state) => {
  return {
    id: state.userReducer.id,
    isValid: state.userReducer.isValid,
  };
};

export default connect(mapState, { login })(LoginForm);
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
  font-size: 1rem;
  border: none;
  padding: 0.5rem 3rem;
  letter-spacing: 0.2rem;
  &:hover {
    background-color: lightcyan;
    color: black;
    box-shadow: 2px 2px 3px black;
  }
`;
