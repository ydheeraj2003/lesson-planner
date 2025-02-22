import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LessonPlanner from "./pages/LessonPlanner";


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/lesson-planner" element={<LessonPlanner />} />
        
      </Routes>
    </Router>
  );
}

export default App;
