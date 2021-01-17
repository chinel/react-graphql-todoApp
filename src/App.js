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
      <h1>GraphQL Checklist</h1>
      {/* Todo Form */}
      <form action="">
        <input type="text" placeholder="Write your todo" />
        <button type="submit">Create</button>
      </form>
      {/* Todo List*/}
      <div>
        {data.todos.map((todo) => (
          <p key={todo.id}>
            <span>{todo.text}</span>
            <button>&times;</button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
