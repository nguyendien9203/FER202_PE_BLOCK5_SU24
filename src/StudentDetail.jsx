import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";
import { DataContext } from "./DataContext";
import axios from "axios";

const StudentDetail = () => {
  const { studentId } = useParams();
  const { students, evaluations, setEvaluations } = useContext(DataContext);

  const [formData, setFormData] = useState({
    studentId: studentId,
    grade: "",
    additionalExplanation: "",
  });

  const student = students.find((st) => st.studentId === studentId);
  console.log(student);
  const evaluationStd = evaluations.filter(
    (eva) => eva.studentId === studentId
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.grade === "" || formData.additionalExplanation === "") {
      alert("Grade and AdditionalExplanation are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/evaluations", {
        studentId: formData.studentId,
        grade: formData.grade,
        additionalExplanation: formData.additionalExplanation,
      });

      if (response.status === 201) {
        setEvaluations((prevEvaluations) => [
          ...prevEvaluations,
          {
            id: response.data.id,
            studentId: formData.studentId,
            grade: formData.grade,
            additionalExplanation: formData.additionalExplanation,
          },
        ]);
      }

      alert('Add a new Grade success');
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Button as={Link} to="/" variant="success">
        Back to Home
      </Button>
      <h5 className="text-center fw-bold">{student.name}'s Grade Details</h5>
      <h5 className="fw-bold">Add a new grade</h5>
      <Form className="d-flex my-3" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Enter grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <Form.Control
          className="mx-2"
          type="text"
          placeholder="Enter additional explantion"
          name="additionalExplanation"
          value={formData.additionalExplanation}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">
          Add new
        </Button>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {evaluationStd.map((evaStd) => (
            <tr key={evaStd.id}>
              <td>{evaStd.grade}</td>
              <td>{evaStd.additionalExplanation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StudentDetail;
