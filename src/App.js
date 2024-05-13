import "./App.css";
import TaskManager from "./components/TaskManager";
import Sidebar from "./components/Sidebar";
import { Row, Col } from "react-bootstrap";
import { AppProvider } from "./AppContext";
function App() {
  return (
    <AppProvider>
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col md={10} className="taskManager">
            <TaskManager />
          </Col>
        </Row>
    </AppProvider>
  );
}

export default App;
