import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {

      const body = {email, password};
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      
      localStorage.setItem('token', parseResponse.token);
      setAuth(true);
      
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e=>onChange(e)}
          autoComplete="off"
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e=>onChange(e)}
          autoComplete="off"
        />
        <button className="btn btn-block btn-success">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
