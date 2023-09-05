
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Homepage from './Components/pages/Homepage';
import Signup from './Components/pages/Signup';
import Login from './Components/pages/Login';

function App() {


  return (
   <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/signin" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
 
   </Routes>
  )
}

export default App
