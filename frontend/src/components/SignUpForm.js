import { useState } from 'react';
import { useAuthStore } from '../store';
import { useNavigate ,Link } from 'react-router-dom';
const SignUpForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { authReducer } = useAuthStore();
  // const user = useAuthstore((state) => state.user) ;
  const url = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch(`${url}/user/signup`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      )
      const data = await res.json();
      // console.log(data) ;

      if (data.email) {
        localStorage.setItem('user', JSON.stringify(data));
        authReducer({ type: 'LOGIN', payload: data });
        // console.log(data) ;
        navigate('/');
      }
      else {
        setError(data.error);
        console.log(error);
      }



    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-start">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-start">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg" >
            Sign Up
          </button>
          {error && (
            <span className="text-red-500 text-sm mt-2 block">{error}</span>
          )}
          <div className="mt-4 text-center">
            <span className="text-sm">Already have an account?</span>
            <Link to="/login" className="text-blue-500 ml-2">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
