import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, task];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const updateTask = (taskId, newTask) => {
    setTasks((preveTasks) => {

      const newTasks = preveTasks.map((task) =>
        task.id === taskId ? { ...task, ...newTask } : task
      )
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    }
      
     
    );
  };

  const deleteTask = (taskId) => {
    setTasks((preveTasks) => {

      const newTasks = preveTasks.filter((task) => task.id !== taskId)
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    })
  };

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm onSubmit={addTask} />
      <TodoList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onComplete={completeTask}
        onFilter={filterTasks}
      />
    </div>
  );
}

export default App;
