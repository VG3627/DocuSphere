import { useAuthStore } from "../store";
import { Link } from "react-router-dom";


const Home = () => {

    const {user} = useAuthStore() ;
    // console.log(user) ;
    return (
        <div className="min-h-screen bg-gray-100">
          {/* <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-xl font-bold">DocsApp</div>
              <div>
                <Link to="/login" className="text-blue-500 hover:text-blue-700 mx-2">Login</Link>
                <Link to="/signup" className="text-blue-500 hover:text-blue-700 mx-2">Sign Up</Link>
              </div>
            </div>
          </nav> */}
    
          <header className="bg-blue-500 text-white text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Welcome to DocuSphere</h1>
            <p className="text-lg mb-8">Create, edit, and collaborate on documents with ease.</p>
            {!user && <Link to="/signup" className="bg-white text-blue-500 font-bold py-2 px-4 rounded shadow hover:bg-gray-100">
              Get Started
            </Link>}
          </header>
    
          <section className="container mx-auto py-16 px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Features</h2>
              <p className="text-gray-700 mt-4">Everything you need to manage your documents efficiently.</p>
            </div>
    
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-2">Create</h3>
                <p className="text-gray-600">Easily create new documents with our intuitive editor.</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-2">Edit</h3>
                <p className="text-gray-600">Edit your documents in real-time and keep track of changes.</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-2">Collaborate</h3>
                <p className="text-gray-600">Work together with your team and manage permissions seamlessly.</p>
              </div>
            </div>
          </section>
    
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 DocuSphere. Created by @VG3627</p>
            </div>
          </footer>
        </div>
      );
}
 
export default Home;