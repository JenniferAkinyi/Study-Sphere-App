import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { SidebarProvider } from "./context/SidebarContext";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import PostDetails from './components/Posts/PostDetails'
import StudyScreen from './components/Study Group/StudyScreen'
// import StudyGoalsPage from './components/Study Group/Components/'


function App() {
  return (
    <>
      <Router>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/studygroup" element={<StudyScreen />} />
              {/* <Route path="/studygoals" element={<StudyGoalsPage />} /> */}
            </Route>
          </Routes>
        </SidebarProvider>
      </Router>
    </>
  );
}

export default App;
