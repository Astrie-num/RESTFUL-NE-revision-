import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';
import Display from './pages/display';
import Common from './pages/common';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/common" element={<Common />} />
          <Route path="/admin-only" element={<Display />} />
        </Routes>

    </div>
  );
}

export default App;
