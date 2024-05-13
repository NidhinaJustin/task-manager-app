import "./App.css";
import { Row, Col } from "react-bootstrap";
import { AppProvider } from "./AppContext";
function App() {
  return (
    <AppProvider>
        <Row>
          <Col md={2} className="sidebar">
          </Col>
          <Col md={10} className="taskManager">
          </Col>
        </Row>
    </AppProvider>
  );
}

export default App;
