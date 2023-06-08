import React, { useState } from "react";
import "./TodoForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      setError("Please fill out all the fields");
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      dueDate: formatDate(dueDate), // Apply the formatDate function to convert the date
    };
    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setDueDate(null);
    setError("");
  }
  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Convert to ISO format and extract date part
    return formattedDate;
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="datepicker-container">
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Select due date"
          className="custom-datepicker"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
