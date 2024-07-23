import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "antd";

const Home = () => {
  return (
    <Card
      title="Welcome to the Dashboard"
      style={{
        maxWidth: 600,
        margin: "auto",
        marginTop: 50,
        textAlign: "center",
      }}
    >
      <p>Please log in to access the full features of the dashboard.</p>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
    </Card>
  );
};

export default Home;
