// CourseSchedule.tsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";

interface CourseScheduleProps {
  courseTypeId: number;
  courseTypeName: string;
  onRegister: (tabId: string, courseId: number, courseName: string) => void; // Adding this to handle tab switching
}

interface Course {
  id: number;
  name: string;
  startDate: string;
  duration: string;
}

const CourseSchedule: React.FC<CourseScheduleProps> = ({ courseTypeId, courseTypeName, onRegister }) => {
  const navigate = useNavigate();
  const { getAxios, user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCoursesByTypeId = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in.", toastConfig);
        navigate("/signin");
        return;
      }
      const api = getAxios(token);
      try {
        const response = await api.get(`/api/course/safe/allCoursesByTypeId/${courseTypeId}`);
        if (response.data) {
          setCourses(response.data);
        } else {
          throw new Error("No courses found.");
        }
      } catch (error) {
        toast.error("Failed to fetch courses.", toastConfig);
      }
    };

    fetchCoursesByTypeId();
  }, [courseTypeId, navigate, getAxios]);

  const handleRegister = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course first.", toastConfig);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token || !user) {
      toast.error("Session expired, please log in again.", toastConfig);
      navigate("/signin");
      return;
    }

    try {
      const api = getAxios(token);
      const response = await api.post(`/api/user/addCourseToUser/${user.userId}/${selectedCourse.id}`);
      if (response.status === 200) {
        toast.success("Course successfully added to your profile.", toastConfig);
        onRegister("my-courses", selectedCourse.id, selectedCourse.name); // Correctly passing the necessary parameters for tab switching
      } else {
        toast.error("Registration failed: " + response.data.message, toastConfig);
      }
    } catch (error) {
      toast.error("Unexpected error during registration: " + error, toastConfig);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 my-5">{courseTypeName}</h2>
      {courses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <div key={course.id}
              className={`border rounded-lg p-4 shadow-sm ${selectedCourse?.id === course.id ? "bg-blue-100 border-blue-500" : "hover:shadow-md"}`}
              onClick={() => setSelectedCourse(course)}>
              <h3 className="text-xl font-bold">{course.name}</h3>
              <p>Start Date: {course.startDate}</p>
              <p>Duration: {course.duration}</p>
            </div>
          ))}
          <br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleRegister}
            disabled={!selectedCourse}>
            Register
          </button>
        </div>
      ) : <p>No courses available.</p>}
    </div>
  );
};

export default CourseSchedule;
