import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Students = () => {
  const {
    students,
    selectedSubject,
    studentSubjects,
    studentDetails,
    searchTerm,
  } = useContext(DataContext);

  const getStreet = (studentId) => {
    const stdDetail = studentDetails.find((sd) => sd.studentId === studentId);
    return stdDetail ? stdDetail.address.street : "unknown";
  };

  const getCity = (studentId) => {
    const stdDetail = studentDetails.find((sd) => sd.studentId === studentId);
    return stdDetail ? stdDetail.address.city : "unknown";
  };

  const studentsBySubject = studentSubjects
    .filter((stdSub) => stdSub.subjectId === selectedSubject)
    .map((sub) => sub.studentId);

  console.log(studentsBySubject);

  const filteredStudent = students.filter((student) => {
    const matchedSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchedSubject = selectedSubject ? studentsBySubject.includes(student.studentId) : true;
    return matchedSearch && matchedSubject;
  });

  return (
    <>
      <h5>List of Students</h5>

      <Table striped bordered>
        <thead>
          <tr>
            <th>StudentId</th>
            <th>Name</th>
            <th>Age</th>
            <th>Street</th>
            <th>City</th>
            <th>IsRegularStudent</th>
            <th>View grades</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudent.map((student) => (
            <tr key={student.id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{getStreet(student.studentId)}</td>
              <td>{getCity(student.studentId)}</td>
              <td>{student.isRegularStudent ? "Fulltime" : "Applicant"}</td>
              <td>
                <Link to={`/student/${student.studentId}`}>Grades</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Students;
