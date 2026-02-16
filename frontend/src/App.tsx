import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './features/login/LoginPage';
import HomePage from './features/home/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
