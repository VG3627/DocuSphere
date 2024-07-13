import useFetch from "../hooks/useFetch";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner.js";
const Profile = () => {
    
    const {user} = useAuthStore() ;
    const userMail = user.email ;
    const url = process.env.REACT_APP_API_URL ;
    const {data:docs,error,isLoading} = useFetch(`${url}/docs/author/${userMail}`) ;
    
    const imageSrc = "/doc.svg"
    // console.log(docs) ;
    const navigate = useNavigate() ;

    const handleClick = (e) => {
        navigate(`/create/${e}`)
        
    }

    if(isLoading)
    {
        return (<Spinner/>) ;
    }
    // console.log(docs) ;
    if(docs.length === 0)
    {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-white-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m2 2H7m-2 4h10m2-16h2a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h2M9 7h6"
                ></path>
              </svg>
              <h2 className="text-2xl font-semibold text-white-500 mb-2">No Documents Found</h2>
              <p className="text-white-500 mb-6">You haven't created any documents yet.</p>
            </div>
          </div>
        );
    }


    return (
        // <div className="profile"></div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Documents</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {docs && docs.map((doc) => (
                <div key={doc._id} className="group relative" onClick={() => handleClick(doc._id)}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80" >
                    <img
                      src={imageSrc}
                       
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {/* <a >
                          <span aria-hidden="true" className="absolute inset-0" />
                          product name
                        </a> */}
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">product name</p> */}
                    </div>
                    <p className="text-sm font-medium text-gray-900 mr-auto ml-auto">{doc.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       
      )
}
 
export default Profile;