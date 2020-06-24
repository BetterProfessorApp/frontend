import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import AddStudent from "./components/AddStudent";
import StudentPage from "./components/StudentPage";
import styled from "styled-components"

function App() {
  return (
    <Router>
      <div className="App">
        <StyledNav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/user">Dashboard</StyledLink>
          <StyledLink to="/register">Register Now</StyledLink>
        </StyledNav>
      </div>

      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <PrivateRoute exact path="/user">
        <Dashboard />
      </PrivateRoute>
      <Route exact path="/addstudent">
        <AddStudent />
      </Route>
      <Route path="/student/:id" component={StudentPage} />
    </Router>
  );
}

export default App;

const StyledNav = styled.nav`
  height: 7vh;
  background-color: #0A2738;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 3px black;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #A1A7AA;
    color: black;
  }
`