import JobList from './pages/JobList';
import {
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/joblist" element={<JobList />} />
      </Routes>
    </>
  );
}

export default App;
