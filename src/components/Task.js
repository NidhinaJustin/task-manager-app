import React ,{useState} from "react";
import { CardBody, Card, CardTitle, CardText, Modal,Button,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../AppContext";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

/*
 * Component to dispay task ,it will show tasks title , description , due date.
 * User can edit and delete the task.
 * When deleting It will show a modal popup to confirm deletion.
 * If the user confirms for deleteion a call is set to the context there the delete operation is performed.
 */
export default function Task({ task }) {
  const { handleEditTask, handleDeleteTask } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleRemoveTask = () => {
    handleDeleteTask(task)
  };

  return (
    <div>
      <Card className="taskBlock">
        <CardBody className="pb-1">
          <CardTitle tag="h5">{task.title}</CardTitle>
        </CardBody>
        <CardBody>
          <CardText> Due Date: {task.dueDate}</CardText>
          <CardText>{task.description}</CardText>

          <a onClick={handleToggleModal}>
            <DeleteIcon color="error" />
          </a>
          <a onClick={() => handleEditTask(task)}>
            <EditIcon color="primary" />
          </a>
        </CardBody>
      </Card>
      <Modal isOpen={isModalOpen} toggle={handleToggleModal} className="task">
      <ModalHeader toggle={handleToggleModal} className="d-flex justify-content-between align-items-center">
       Delete {task.title}
        <HighlightOffIcon onClick={handleToggleModal} />
      </ModalHeader>
        <ModalBody>
        Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={handleToggleModal}>
            No
          </Button>
          <Button color="danger" onClick={handleRemoveTask}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
