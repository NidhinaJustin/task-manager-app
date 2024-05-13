import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "todo", // Default status
    id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState(""); //key to search for a task
  const [isEditTask, setIsEditTask] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const updateTasks = () => {
    const storedTasks = [...tasks]; // we already have the task data from local storage inside this tasks state value.
    let updatedTasks = [];
    /*
     * If the id of the task(if task contains data we are in edit mode) exists in the tasklist we should update the task.
     * Also the duplicate checkbox should be false , if we are in duplicate mode we should create new task with the existing data.
     * Each task is given a unique id to identify and update the data easily.
     */
    if (storedTasks.some((item) => item.id === task.id && !isDuplicate)) {
      let index = storedTasks.findIndex((item) => item.id === task.id);
      storedTasks[index] = task;
      updatedTasks = storedTasks;
    } else {
      const taskId = uuidv4(); // Generate UUID
      const newTask = { ...task, id: taskId }; // Include UUID in task object
      updatedTasks = [...storedTasks, newTask]; // Add new task to existing tasks array
    }
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Store updated tasks array in local storage
    setTasks(updatedTasks); // storing updated tasks in local state , so that the data will display instantly.
    if (isEditTask) {
      setIsEditTask(false);
      setIsDuplicate(false);
    }
  };
  const handleDeleteTask = (task) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTaskList = storedTasks.filter((item) => item.id !== task.id);// remove the current task from storedTasks.
    localStorage.setItem("tasks", JSON.stringify(newTaskList)); // Store updated tasks array in local storage.
    setTasks(newTaskList);
  };

//Reset the state for subsequent toggles of modal after the edit or creation
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setTask({
      title: "",
      description: "",
      dueDate: "",
      status: "todo", // Reset status
      id: "",
    });
    setIsEditTask(false); // to make the duplicate checkbox hidden while creating a new task
  };
  //Fill the state with the selected task for editing.
  const handleEditTask = (item) => {
    setIsModalOpen(true);
    setIsEditTask(true);
    setTask({
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      status: item.status,
      id: item.id,
    });
  };
  const updateSideBarNav = (item) => {
    setSelectedOption(item);
    setLoading(true);
    setTimeout(() => {
      // After saving is complete, set loading state to false
      setLoading(false);
    }, 2000); // Simulating 2 seconds delay
  };
  const handleSearchTask = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        task,
        isModalOpen,
        selectedOption,
        loading,
        searchKey,
        isEditTask,
        isDuplicate,
        setTask,
        updateTasks,
        handleChange,
        handleToggleModal,
        handleEditTask,
        updateSideBarNav,
        handleDeleteTask,
        handleSearchTask,
        setIsDuplicate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
