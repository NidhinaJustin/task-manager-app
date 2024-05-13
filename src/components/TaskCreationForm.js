import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { useAppContext } from "../AppContext";
import { Row, Col } from "react-bootstrap";

/*
 * Modal Component  to create task, user can give specific title description , due date , status of the task etc.
 * Validation has been added to the form. Errors will be displayed if the user forgets to provide any of the fields.
 * Loader is added when user clicks on save button.
 * If the user confirms for deleteion a call is set to the context there the delete operation is performed.
 * User has the option to duplicate the task.
 */
const TaskCreationForm = () => {
  const {
    updateTasks,
    handleChange,
    task,
    setTask,
    handleToggleModal,
    isModalOpen,
    handleSearchTask,
    searchKey,
    tasks,
    isEditTask,
    setIsDuplicate,
    isDuplicate
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const formErrors = {};
    if (!task.title) {
      formErrors.title = "Title is required";
    }
    if (!task.description) {
      formErrors.description = "Description is required";
    }
    if (!task.dueDate) {
      formErrors.dueDate = "Due Date is required";
    }
    setErrors(formErrors);
    // Check if there are any errors
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      updateTasks(); //setting newItem to context

      setTimeout(() => {
        // After saving is complete, set loading state to false
        setLoading(false);
        handleToggleModal(); //close the modal after form submission
        setTask({
          title: "",
          description: "",
          dueDate: "",
          status: "todo", // Reset status
          id: "",
        });
      }, 1000); // Simulating 2 seconds delay
    }
  };
  /*
   *Users will only be able to select dates from today onwards, effectively preventing them from selecting past dates on the calendar
   *It will set the minimum date so that users wont be able to select previous date for due date.
   */
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  };

  const handleClickCheckbox=()=>{
    setIsDuplicate(!isDuplicate)
  }
  console.log(isEditTask);
  return (
    <div>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-center m-3">
            <Button
              color="primary"
              className="mr-2"
              onClick={handleToggleModal}
            >
              Create new task
            </Button>

            {tasks.length && (
              <Input
                className="w-50"
                type="text"
                name="searchKey"
                value={searchKey}
                onChange={handleSearchTask}
                placeholder="Search tasks..."
              />
            )}
          </div>
        </Col>
      </Row>

      <Modal isOpen={isModalOpen} toggle={handleToggleModal}>
        <ModalHeader toggle={handleToggleModal}>Create your Task</ModalHeader>
        <ModalBody>
          <Form>
         {isEditTask && <label className="mb-2"> <b>Duplicate the current task</b> <input className="duplicateCheckbox"  type='checkbox' checked={isDuplicate} onChange={handleClickCheckbox}/> </label> }
            <FormGroup>
              <Label for="Task Title">Task Title:</Label>
              <Input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
              {errors.title && (
                <div className="text-danger">{errors.title}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description:</Label>
              <Input
                type="textarea"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
              {errors.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Due Date">Due Date:</Label>
              <Input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
                min={getCurrentDate()} // Set the minimum date
              />
              {errors.dueDate && (
                <div className="text-danger">{errors.dueDate}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Status">Status:</Label>
              <Input
                id="Status"
                type="select"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button color="secondary" onClick={handleToggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TaskCreationForm;
