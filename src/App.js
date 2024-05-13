import "./App.css";
import { Row, Col } from "react-bootstrap";
import { AppProvider } from "./AppContext";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <AppProvider>
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar/>
          </Col>
          <Col md={10} className="taskManager">
          </Col>
        </Row>
    </AppProvider>
  );
}

export default App;
