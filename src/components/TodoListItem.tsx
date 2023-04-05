import React from "react";
import { TodoItem } from "./TodoList";

interface TodoListItemProps {
  item: TodoItem;
  onDelete: (id: number) => void;
  onDoneChange: (id: number, done: boolean) => void;
}

export default class TodoListItem extends React.Component<TodoListItemProps> {
  handleDelete = () => {
    this.props.onDelete(this.props.item.id);
  };

  handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onDoneChange(this.props.item.id, event.target.checked);
  };

  render() {
    const { item } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          checked={item.done}
          onChange={this.handleDoneChange}
        />
        <span>{item.text}</span>
        <button onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}
