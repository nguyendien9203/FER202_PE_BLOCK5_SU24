import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Students from "./Students";
import StudentDetail from "./StudentDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Students />} />
        <Route path="/student" element={<Students />} />
        <Route path="/student/:studentId" element={<StudentDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
