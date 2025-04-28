import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';
import Display from './pages/display';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/display" element={<Display />} />
        </Routes>

    </div>
  );
}

export default App;
