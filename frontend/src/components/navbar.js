import React from 'react';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




const Navbar = () => {


  const {user,authReducer } = useAuthStore() ;
  const navigate = useNavigate() ;
  const handleLogout = () => {
    localStorage.removeItem('user') ;
    authReducer({type : 'LOGOUT'})
    navigate('/home') ;
  }
  // let docId = null ;


  const handleCreateDoc = async () => {

    if(!user)
    {
      alert("You need to login before creating docs!") ;
      return ;
    }
    const authors = new Array({userMail:user.email,role:"owner"}) ;
   

    const url = process.env.REACT_APP_API_URL ;
    try {
      const res = await fetch(`${url}/docs/`,
        {
          method : 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({title : "untitled" , authors}) 
        }
      );
      const data = await res.json() ;
      console.log(data) ;
      const docId = data._id ;
      navigate(`/create/${docId}`)
    } catch (error) {
      console.log(error) ;
    }
   
  }


  return (
    <nav className="bg-white-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-blue-500 text-lg font-bold">DocuSphere</div>
        <div className="space-x-4">
          <Link to="/home" className="text-blue-500 hover:text-gray-300">Home</Link>
          {<Link  className="text-blue-500 hover:text-gray-300" onClick={handleCreateDoc}>Create Doc</Link>}
          {!user && <Link to="/login" className="text-blue-500 hover:text-gray-300">Login</Link>}
          {!user && <Link to="/signup" className="text-blue-500 hover:text-gray-300">Sign Up</Link>}
          {user &&
            (<>
             <Link to={`/home/${user.email}`} className="text-blue-500 hover:text-gray-300">My Docs</Link>
             <span className="text-blue-900 font-semibold">Hello! {user.email}</span>
             <button 
               onClick={handleLogout} 
               className="text-blue-500 hover:text-gray-300">
               Logout
             </button> 
             </>)
          }
            
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
