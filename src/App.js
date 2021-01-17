import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;

const TOGGLE_TODOS = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        text
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String) {
    insert_todos(objects: { text: $text }) {
      returning {
        done
        id
        text
      }
    }
  }
`;
//list todos
//add todo
//toggle todos
//delete todos

function App() {
  const [todoText, setTodoText] = React.useState("");
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODOS); // this returns a function we will destructure from an array
  const [addToDo] = useMutation(ADD_TODO);
  async function handleToggleTodo(todo) {
    const data = await toggleTodo({
      variables: { id: todo.id, done: !todo.done },
    });
    console.log(data);
  }

  async function handleAddToDo(event) {
    event.preventDefault();
    if (!todoText.trim()) return;
    const data = await addToDo({ variables: { text: todoText } });
    console.log("added todo", data);
    setTodoText("");
  }

  if (loading) return <div>Loading todos</div>;
  if (error) return <div>Error fetching todos</div>;
  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
      <h1 className="f2-l">
        GraphQL Checklist{" "}
        <span role="img" aria-label="Checkmark">
          ✅
        </span>
      </h1>
      {/* Todo Form */}
      <form className="mb3" onSubmit={handleAddToDo}>
        <input
          className="pa2 f4 b--dashed"
          type="text"
          placeholder="Write your todo"
          onChange={(event) => setTodoText(event.target.value)}
          value={todoText}
        />
        <button className="pa2 f4 bg-green" type="submit">
          Create
        </button>
      </form>
      {/* Todo List*/}
      <div className="flex items-center justify-center flex-column">
        {data.todos.map((todo) => (
          <p
            onDoubleClick={
              () =>
                handleToggleTodo(
                  todo
                ) /*This is called an inline arrow function */
            }
            key={todo.id}
          >
            <span className={`pointer list pa1 f3 ${todo.done && "strike"}`}>
              {todo.text}
            </span>
            <button className="bg-transparent bn f4">
              <span className="red">&times;</span>
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
