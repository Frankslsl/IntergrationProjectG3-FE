import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";
import { AxiosError } from "axios";

const UserProfile = () => {
  const { isAuthenticated, getAxios, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.warn("Login expired, please login again", toastConfig);
      navigate("/signin");
    } else if (authUser?.userId) {
      const api = getAxios(localStorage.getItem("token"));
      api
        .get(`/api/user/${authUser.userId}`)
        .then((response) => {
          if (response.status === 200) {
            setUserData({
              ...response.data,
              password: "",
              confirmPassword: "",
            });
          } else {
            throw new Error("Failed to fetch user data.");
          }
        })
        .catch((error) => {
          const errMsg =
            error instanceof AxiosError
              ? error.response?.data.message
              : "An unknown error occurred";
          toast.error(`Error fetching user data: ${errMsg}`, toastConfig);
        });
    }
  }, [isAuthenticated, navigate, authUser?.userId, getAxios]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    if (value !== userData.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
    setUserData((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match", toastConfig);
      return;
    }

    const api = getAxios(localStorage.getItem("token"));
    const payload = {
      phoneNumber: userData.phoneNumber,
      ...(userData.password && { password: userData.password }),
    };
    api
      .put(`/api/user/editUser/${authUser?.userId}`, payload)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Profile updated successfully!", toastConfig);
        } else {
          throw new Error("Failed to update profile.");
        }
      })
      .catch((error) => {
        const errMsg =
          error instanceof AxiosError
            ? error.response?.data.message
            : "An unknown error occurred";
        toast.error(`Failed to update profile: ${errMsg}`, toastConfig);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-3">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Static fields */}
        <div className="flex flex-col">
          <label className="font-medium">First Name:</label>
          <input
            type="text"
            value={userData.firstName}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Last Name:</label>
          <input
            type="text"
            value={userData.lastName}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Email:</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Username:</label>
          <input
            type="text"
            name="userName"
            value={userData.username}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* Editable fields */}
        <div className="flex flex-col">
          <label className="font-medium">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">New Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {userData.password && (
          <div className="flex flex-col">
            <label className="font-medium">Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">{passwordError}</div>
            )}
          </div>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
