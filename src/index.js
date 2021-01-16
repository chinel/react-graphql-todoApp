import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://react-todo-graphql-api-1.herokuapp.com/v1/graphql",
});

client.query({});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
