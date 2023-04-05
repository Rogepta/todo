import React from "react";
import TodoListItem from "./TodoListItem";
import { StateManager } from "./stateManager";

import "../styles/TodoList.scss";

export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

interface TodoListProps {
  stateManager: StateManager;
}

interface TodoListState {
  items: TodoItem[];
  newItemText: string;
  filter: "all" | "done" | "undone";
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      items: [],
      newItemText: "",
      filter: "all",
    };
    this.props.stateManager.subscribe(() => {
      const state = this.props.stateManager.getState();
      this.setState({ items: state.items });
    });
  }

  handleNewItemTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItemText: event.target.value });
  };

  handleNewItemSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = this.state.items.length + 1;
    const text = this.state.newItemText;
    const done = false;
    const items = [...this.state.items, { id, text, done }];
    this.props.stateManager.setState({ items });
    this.setState({ newItemText: "" });
  };

  handleItemDelete = (id: number) => {
    const items = this.state.items.filter((item) => item.id !== id);
    this.props.stateManager.setState({ items });
  };

  handleItemDoneChange = (id: number, done: boolean) => {
    const items = [...this.state.items].map((item) => {
      if (item.id === id) {
        return { ...item, done };
      }
      return item;
    });
    this.props.stateManager.setState({ items });
  };

  handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filter: event.target.value as TodoListState["filter"] });
  };

  render() {
    let items = this.state.items;
    if (this.state.filter === "done") {
      items = items.filter((item) => item.done);
    } else if (this.state.filter === "undone") {
      items = items.filter((item) => !item.done);
    }

    const itemElements = items.map((item: TodoItem) => (
      <li key={item.id}>
        <TodoListItem
          item={item}
          onDelete={this.handleItemDelete}
          onDoneChange={this.handleItemDoneChange}
        />
      </li>
    ));

    return (
      <div className="todo-list">
        <form onSubmit={this.handleNewItemSubmit}>
          <input
            type="text"
            value={this.state.newItemText}
            onChange={this.handleNewItemTextChange}
          />
          <button type="submit">Add</button>
        </form>
        <div className="filter">
          <label htmlFor="filter-select">Filter:</label>
          <select
            id="filter-select"
            value={this.state.filter}
            onChange={this.handleFilterChange}
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
        </div>
        <ul>{itemElements}</ul>
      </div>
    );
  }
}

export default TodoList;
