import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // console.log(selectedSubject);


  useEffect(() => {
    const fetchData = async () => {
      const studentsRes = await axios.get("http://localhost:9999/students");
      setStudents(studentsRes.data);
      const subjectsRes = await axios.get("http://localhost:9999/subjects");
      setSubjects(subjectsRes.data);
      const studentDetailsRes = await axios.get("http://localhost:9999/student_details");
      setStudentDetails(studentDetailsRes.data);
      const evaluationsRes = await axios.get("http://localhost:9999/evaluations");
      setEvaluations(evaluationsRes.data);
      const studentSubRes = await axios.get("http://localhost:9999/students_subjetcs");
      setStudentSubjects(studentSubRes.data);
    };

    fetchData();
  }, []);

  // console.log(students);
  // console.log(studentDetails);
  // console.log(evaluations);
  // console.log(subjects);
  // console.log(studentSubjects);

  return (
    <DataContext.Provider
      value={{
        students,
        studentDetails,
        evaluations,
        subjects,
        studentSubjects,
        selectedSubject,
        searchTerm,
        setStudents,
        setStudentDetails,
        setEvaluations,
        setSubjects,
        setStudentSubjects,
        setSelectedSubject,
        setSearchTerm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
