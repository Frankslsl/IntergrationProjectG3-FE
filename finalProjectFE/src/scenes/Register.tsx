import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { SelectedPage } from "../components/enum/selectedPage";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

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
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors: FormErrors = {};
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
    const registerUrl = "http://localhost:8080/api/auth/register";
    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //   const data = await response.json();

      console.log(response);
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Registration successful",
          severity: "success",
        });
        setTimeout(() => navigate("/signin"), 2000); // Delayed redirect to show message
      } else {
        let errorMessage = "Registration failed";
        if (data.errorCode === "EMAIL_ALREADY_REGISTERED") {
          errorMessage = "Email has already been registered";
        } else if (data.errorCode === "USERNAME_ALREADY_TAKEN") {
          errorMessage = "Username is already takern";
        } else if (data.errorCode === "PHONE_ALREADY_REGISTERED") {
          errorMessage = "Phone is already registered";
        }
        setSnackbar({ open: true, message: errorMessage, severity: "error" });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred during registration",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Register;
