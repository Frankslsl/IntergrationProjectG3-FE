import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/dashboard/authContext";
import Navbar from "@/scenes/navbar";
import { SelectedPage } from "../components/enum/selectedPage";
import { toast } from "react-toastify";
// import Alert from 'react-bootstrap/Alert';

// the configuration about the toast
const toastConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

const SignIn = () => {
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("123456");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    //preset
    const presetEmail = "12@gmail.com";
    const presetPassword = "1234";

    if (email === presetEmail && password === presetPassword) {
      //toast out the success message
      toast.success("Login successfully", {
        ...toastConfig,
        position: "top-center",
      });
      navigate("/dashboard");
    } else {
      toast.error("Login failed, Invalid email or password", {
        ...toastConfig,
        position: "top-center",
      });
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
      <div className="flex h-screen bg-gray-200">
        <div className="m-auto w-full max-w-md rounded bg-white p-8 shadow">
          <h1 className="text-xl font-bold text-center text-gray-700">
            Sign In
          </h1>
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
          {/* {showAlert && <Alert variant="success">{alertContent}</Alert>} */}
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
