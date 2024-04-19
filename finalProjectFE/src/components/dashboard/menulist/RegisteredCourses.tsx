// RegisteredCourses.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";

interface Course {
  id: number;
  name: string;
  startDate: string;
  duration: string;
}

const RegisteredCourses = () => {
  const { getAxios, user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) {
        toast.error("Please log in.", toastConfig);
        return;
      }
      try {
        const api = getAxios(token);
        const response = await api.get(`api/course/courseList/{userId}/${user.userId}`);
        if (response.data) {
          setCourses(response.data);
        } else {
          toast.error("No registered courses found.", toastConfig);
        }
      } catch (error) {
        toast.error("Failed to fetch registered courses.", toastConfig);
      }
    };

    fetchRegisteredCourses();
  }, [getAxios, user]);  

  return (
    <div>
      <h2 className="text-xl font-bold">Your Registered Courses</h2>
      {courses.length > 0 ? courses.map(course => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>Start Date: {course.startDate}</p>
          <p>Duration: {course.duration}</p>
        </div>
      )) : <p>You have not registered for any courses yet.</p>}
    </div>
  );
};

export default RegisteredCourses;
