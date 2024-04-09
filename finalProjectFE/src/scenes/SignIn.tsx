import { useState } from "react";
import { useAuth } from "../components/dashboard/authContext";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSignIn = async () => {
    try {
      await login({ email, password });
      toast.success("Login successfully", {
        ...toastConfig,
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message, {
          ...toastConfig,
          position: "top-center",
        });
      }
    }
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
