import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/dashboard/authContext'; 
import Navbar from "@/scenes/navbar";
import { SelectedPage } from "../components/enum/selectedPage"; 
import Alert from 'react-bootstrap/Alert';
const SignIn = () => {
  const [email, setEmail] = useState('123@gmail.com');
  const [password, setPassword] = useState('123456'); 
  const auth = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert]=useState(false);
  const [alertContent,setAlertContent]=useState('');



  const selectedPage = SelectedPage.SignIn;
  const setSelectedPage = () => {}; 
  const isTopOfPage = true; 

  const handleSignIn = async () => {
    //preset
    const presetEmail = "12@gmail.com";
    const presetPassword = '1234';

    if (email=== presetEmail && password === presetPassword) {
      setAlertContent('Login sucessfully');
      setShowAlert(true);
      setTimeout(()=>navigate('/dashboard'),2000);//2 seconds redirect
      
    }else{
      setAlertContent('Login failed, Invalid email or password');
      setShowAlert(true);
    }

    //back end 
      // const result = await auth.login({ email, password });
      // if (result) {
      //   navigate('/dashboard'); 
      // } else {
      //   console.log('Login failed: Invalid email or password.');
      // }
  };
  return (
    <div>
      <Navbar 
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isTopOfPage={isTopOfPage}
      />
      <div className="flex h-screen bg-gray-200">
        <div className="m-auto w-full max-w-md rounded bg-white p-8 shadow">
          <h1 className="text-xl font-bold text-center text-gray-700">Sign In</h1>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2 mt-4 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2 mt-4 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          />
          {showAlert && <Alert variant="success">{alertContent}</Alert>}
          <button
            onClick={handleSignIn}
            className="w-full rounded bg-blue-500 py-2 mt-6 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
