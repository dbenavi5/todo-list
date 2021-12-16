import { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  //send data to backend
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <h1 className="textt-center mt-5">Input Todo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add to List</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
