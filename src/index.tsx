import * as React from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import { StateManager } from "./components/stateManager";

const stateManager = new StateManager();

ReactDOM.render(
  <TodoList stateManager={stateManager} />,
  document.getElementById("root")
);
