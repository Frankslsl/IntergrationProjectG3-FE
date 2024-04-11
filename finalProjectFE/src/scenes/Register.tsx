// noinspection Annotator

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useAuth } from "@/components/dashboard/authContext";
import { toast } from "react-toastify";

//toastify configuration
const toastConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

interface FormErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

const Register = () => {
  //get the axios api with baseURL
  const { getAxios } = useAuth();
  const api = getAxios(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const validate = () => {
    const tempErrors: FormErrors = {};
    tempErrors.username = formData.username ? "" : "Username is required.";
    tempErrors.firstName = formData.firstName ? "" : "First name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last name is required.";
    tempErrors.phoneNumber = formData.phoneNumber
      ? ""
      : "Phone number is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email)
      ? ""
      : "Email is not valid.";
    tempErrors.password =
      formData.password.length > 5
        ? ""
        : "Password must be at least 6 characters long.";
    tempErrors.confirmPassword =
      formData.password === formData.confirmPassword
        ? ""
        : "Passwords do not match.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Assumed backend registration endpoint
    try {
      const response = await api.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      localStorage.setItem("token", response.data.token);

      toast.success("Registration successful", {
        ...toastConfig,
        position: "top-center",
      });
      //   localStorage.setItem("token", response.body);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container maxWidth="sm" className="py-10">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Complete form with all fields */}
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                margin="normal"
                required
                fullWidth
                id={key}
                label={
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")
                } // Convert camelCase to space-separated words and capitalize first letter
                name={key}
                autoComplete={key}
                value={formData[key]}
                onChange={handleChange}
                error={!!errors[key]}
                helperText={errors[key]}
                type={key.includes("password") ? "password" : "text"}
              />
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
