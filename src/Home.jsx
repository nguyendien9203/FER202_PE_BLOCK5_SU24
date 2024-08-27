import React from "react";
import { Row, Col } from "react-bootstrap";
import Subjects from "./Subjects";
import Search from "./Search";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-5">
      <h5 className="text-center">Student Management</h5>
      <div style={{ padding: '20px 150px'}}>
        <Search />
      </div>
      <Row>
        <Col md={3}>
        <Subjects />
        </Col>
        <Col md={9}>
        <Outlet />
        </Col>
      </Row>
      <hr />
      <h6 className="text-center">Copyright by: HE171038</h6>
    </div>
  );
};

export default Home;
