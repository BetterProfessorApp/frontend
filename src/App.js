import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import AddStudent from "./components/AddStudent";
import StudentPage from "./components/StudentPage";
import AddProject from "./components/AddProject";
import { useSelector } from "react-redux";
import styled from "styled-components";
function App() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // console.log(status);
    if (localStorage.getItem("token")) {
      setStatus(true);
    }
  }, [useSelector((state) => state.userReducer.refresh)]);
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(true);
    window.location.assign("/login");
    setStatus(false);
  };
  return (
    <Router>
      <div className="App">
        {status ? (
          <StyledNav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login" onClick={logoutHandler}>
              Logout
            </StyledLink>
            <StyledLink to="/userdashboard">Dashboard</StyledLink>
            <StyledLink to="/register">Register Now</StyledLink>
          </StyledNav>
        ) : (
          <StyledNav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/userdashboard">Dashboard</StyledLink>
            <StyledLink to="/register">Register Now</StyledLink>
          </StyledNav>
        )}
      </div>
      <Switch>
        <PrivateRoute exact path="/userdashboard" component={Dashboard} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
      <Route exact path="/user" component={Dashboard} />

      <Route exact path="/register" component={RegisterForm} />

      <Route exact path="/addstudent">
        <AddStudent />
      </Route>
      <Route exact path="/student/:id" component={StudentPage} />
      <Route exact path="/student/addproject/:id" component={AddProject} />
    </Router>
  );
}

export default App;
const StyledNav = styled.nav`
  height: 7vh;
  background-color: #0a2738;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 3px black;
  font-size: 1.5rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #a1a7aa;
    color: black;
  }
`;
