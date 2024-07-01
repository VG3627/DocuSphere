import { useParams } from "react-router-dom";
import { useAuthStore } from "./store";
import { Navigate } from "react-router-dom";



const ProtectedRoutes = ({children}) => {

    const { id } = useParams() ;
    const { user } = useAuthStore() ;
    
    if(user.email === id)
    {
        
        return children ;
    }
    else{
        return <Navigate to = '/home'/>
    }
}
 
export default ProtectedRoutes;