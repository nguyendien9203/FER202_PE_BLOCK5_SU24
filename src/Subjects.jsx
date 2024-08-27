import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Subjects = () => {
  const { subjects, setSubjects, setSelectedSubject } = useContext(DataContext);
  const [formData, setFormData] = useState({
    subjectId: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.subjectId === "" || formData.name === "") {
      alert("SubjectId and SubjectName are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/subjects", {
        subjectId: formData.subjectId,
        name: formData.name,
      });

      if (response.status === 201) {
        setSubjects((prevSubjects) => [
          ...prevSubjects,
          {
            id: response.data.id,
            subjectId: formData.subjectId,
            name: formData.name,
          },
        ]);

        alert("Add new a subject success");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <h5>Subjects</h5>
      <ul>
        {subjects.map((sub) => (
          <Link
            key={sub.id}
            to={`/student/?subject=${sub.subjectId}`}
            onClick={() => setSelectedSubject(sub.subjectId)}
          >
            <div>{sub.name}</div>
          </Link>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="w-100"
          type="text"
          placeholder="Enter SubjectId"
          name="subjectId"
          value={formData.subjectId}
          onChange={handleChange}
        />
        <br />
        <input
          className="w-100 my-2"
          type="text"
          placeholder="Enter SubjectName"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />{" "}
        <br />
        <input value="Add" type="submit" />
      </form>
    </>
  );
};

export default Subjects;
