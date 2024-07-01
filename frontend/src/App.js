import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Create from './components/Create';
import Profile from './components/profile';
import Home from './components/Home';
import { useAuthStore } from './store';
import ProtectedRoutes from './protectedRoutes';
function App() {


  const { user } = useAuthStore() ;
   
  return (
      
      <div className="App">
      
         <Router>
         <Navbar/>
          <Routes>
            <Route path='/' element={<Navigate to = '/home'/>}/>
            {<Route path='/login' element={!user ? <LoginForm/> : <Navigate to='/home'/>}/>}
            {<Route path='/signup' element={!user ? <SignUpForm/> : <Navigate to='/home'/>}/>}
            {user && <Route path='/create/:id' element={user ? <Create/> : <Navigate to='/home'/>}/>} 
            <Route path='/home' element={<Home/>}/>
            {<Route path='/home/:id' element={user ? <ProtectedRoutes><Profile/></ProtectedRoutes> : <Navigate to='/home'/>}/>}
          </Routes>
         </Router>
      </div>
    
    
  );
}

export default App;
