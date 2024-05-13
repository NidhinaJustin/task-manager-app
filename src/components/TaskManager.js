import React, { useState, useEffect } from "react";
import TaskProgress from "./TaskProgress";
import { Row, Col } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import PageNotFound from "./PageNotFound";
import TaskCreationForm from "./TaskCreationForm";
/*
 * This component is used for fetching tasks and passing it to respective components based on status like todo , inProgress and done.
 * Added a loader to the component so initially it will show before the component actually renders.
 * If user selects component other than Dasboard it will display the "requested page is not available".
 * User can search for tasks using any keyword.
 * Most of the data which is used commonly in other components are stored inside the context.
 */
export default function TaskManager() {
  const { tasks, loading, searchKey, selectedOption } = useAppContext();
  const [taskList, setTaskList] = useState(tasks); // State to store the tasks locally in this component.

  /*
   * If searchkey is not empty filter the tasks based on that key.
   * Store the filtered task in the state taskList.
   * If searchkey is not there means ,it is the normal scenario without search operation.
   * In such a scenario just place the tasks inside same state taskList.
   */
  useEffect(() => {
    if (searchKey !== "") {
      const filteredTasks = tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchKey.toLowerCase());
      });
      setTaskList(filteredTasks);
    } else {
      setTaskList(tasks);
    }
  }, [searchKey, tasks]);
  //Filtering taskList based on the status of the task.
  const toDoTasks = taskList?.filter((item) => item?.status === "todo");
  const inProgressTasks = taskList?.filter(
    (item) => item?.status === "inProgress"
  );
  const doneTasks = taskList?.filter((item) => item?.status === "done");
  return !loading ? (
    <>
      {selectedOption === "Dashboard" ? (
        <>
          <TaskCreationForm />
          {taskList.length ? (
            <Row>
              <Col md={4}>
                <TaskProgress tasks={toDoTasks} title="To Do" />
              </Col>
              <Col md={4}>
                <TaskProgress tasks={inProgressTasks} title="In Progress" />
              </Col>
              <Col md={4}>
                <TaskProgress tasks={doneTasks} title="Done" />
              </Col>
            </Row>
          ) : searchKey === "" ? (
            <div className="centralizeItem ">
              <h2>No Tasks to show , Create your new task</h2>
            </div>
          ) : (
            <div className="centralizeItem ">
              <h2>{`No Task Found with the key "${searchKey}"`}</h2>
            </div>
          )}
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  ) : (
    <div className="centralizeItem">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
