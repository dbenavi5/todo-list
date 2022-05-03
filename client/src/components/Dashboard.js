import React, { Fragment, useState, useEffect } from "react";

import InputTodo from "./InputTodo";
import ListTodo from "./ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      setName(parseResponse.user_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h1 className="mt-5">{name}</h1>
        <button className="btn btn-primary mt-3" onClick={(e) => logout(e)}>
          Logout
        </button>
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
};

export default Dashboard;
