import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentList = () => {
  const students = useSelector((state) => state.userReducer.students);
  console.log(students);

  return (
    <>
      {students.map((student, index) => {
        return (
          <div key={index}>
            <Link
              to={`/student/${student.name}`}
              style={{ textDecoration: "none" }}
            >
              <p>{student.name}</p>
              <p>{student.email}</p>
              <p>{student.subject}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default StudentList;
