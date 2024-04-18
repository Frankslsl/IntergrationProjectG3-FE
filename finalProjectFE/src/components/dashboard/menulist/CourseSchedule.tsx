import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";

interface CourseScheduleProps {
  courseTypeId: number;
  courseTypeName: string;
}
interface Course {
  id: number;
  name: string;
  startDate: string;
  duration: string;
}

const CourseSchedule: React.FC<CourseScheduleProps> = ({ courseTypeId, courseTypeName }) => {
  const navigate = useNavigate();
  const { getAxios } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
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
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesByTypeId();
  }, [courseTypeId, navigate, getAxios]);
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedDate(course.startDate); 
  };

  const handleRegister = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course first.", {
        ...toastConfig,
        position: "top-right",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const api = getAxios(token);

    try {
      const response = await api.post("/api/course/register", {
        courseId: selectedCourse.id
      });

      if (response.status === 200) {
        toast.success("Course successfully registered", {
          ...toastConfig,
          position: "top-right",
        });
        setSelectedCourse(null);
        setSelectedDate(""); 
      } else {
        toast.error("Registration failed.", {
          ...toastConfig,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Unexpected error during registration.", {
        ...toastConfig,
        position: "top-right",
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 my-5">  Select course Date  </h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            
            <div
            key={course.id}
            className={`border rounded-lg p-4 shadow-sm transition-shadow duration-200 cursor-pointer ${selectedDate === course.startDate ? "bg-blue-100 border-blue-500" : "hover:shadow-md"}`}
            onClick={() => handleCourseSelect(course)}
          >
              <h3 className="text-xl font-bold">{courseTypeName}</h3>
              <p>Start Date: {course.startDate}</p>
              <p>Duration: {course.duration}</p>
            </div>
          ))}
        </div>
      )}
      <br />
      <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleRegister}
            disabled={!selectedCourse}
          >
            Register
      </button>
    </div>
  );
};

export default CourseSchedule;


