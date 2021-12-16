import { Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const jsonData = await response.json(); // must be parsed

      setTodos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} /></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
