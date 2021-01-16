import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;
//list todos
//add todo
//toggle todos
//delete todos

function App() {
  const { data, loading, error } = useQuery(GET_TODOS);
  if (loading) return <div>Loading todos</div>;
  if (error) return <div>Error fetching todos</div>;
  return (
    <div>
      {data.todos.map((todo) => (
        <p key={todo.id}>
          <span>{todo.text}</span>
          <button>&times;</button>
        </p>
      ))}
    </div>
  );
}

export default App;
