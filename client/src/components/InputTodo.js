import { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  //send data to backend
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const res = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
      window.location = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">To-do List</h1>
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
