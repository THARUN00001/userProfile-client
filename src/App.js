
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/registerPage';
import UserDashboard from './pages/userDashboard'
import Login from "./pages/login"
import AddMoreDataOrEdit from './pages/addMoreDataOrEdit';
function App() {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Register />} />
             <Route path="/userDashboard" element={<UserDashboard />} />
             <Route path='/addMoreDataOrEdit' element={<AddMoreDataOrEdit/>} />
          <Route path='Login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
