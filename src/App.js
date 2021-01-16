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
  const { data, loading } = useQuery(GET_TODOS);

  return <div>App</div>;
}

export default App;
