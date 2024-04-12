import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface CourseScheduleProps {
  course: {
    id: number;
    name: string;
  };
}

interface Course {
  id: number;
  name: string;
  startDate: string;
  times: string[]; 
}

const CourseSchedule: React.FC<CourseScheduleProps> = ({ course }) => {
  const navigate = useNavigate();
  const { getAxios } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseSchedule = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to view the course schedule.');
        navigate('/signin');
        return;
      }

      const api = getAxios(token);
      try {
        const response = await api.get(`/api/course-schedule/${course.id}`);
        if (response.data && response.data.length > 0) {
          setCourses(response.data); 
        } else {
          throw new Error('No data available');
        }
      } catch (error) {
        console.error('Fetching course schedule failed or no data:', error);
        toast.error('No course schedule found, using mock data.');
        setCourses([
          {
            id: course.id,
            name: course.name,
            startDate: "2024-01-01",
            times: ["09:00 - 10:30", "11:00 - 12:30", "13:00 - 14:30"] 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (course) {
      fetchCourseSchedule();
    }
  }, [course, getAxios, navigate]);

  const handleSelectTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleRegister = async (courseId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to register for the course.');
      navigate('/signin');
      return;
    }

    const api = getAxios(token);

    try {
      const response = await api.post(
        '/api/course/register',
        { courseId }
      );

      if (response.status === 200) {
        setSelectedTime(null); // Reset selected time after registration
        toast.success('Course successfully registered');
      } else {
        toast.error('Registration failed: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast.error('Token expired, please log in again.');
          navigate('/signin');
        } else if (error.response) {
          toast.error('Registration error: ' + error.response.data);
        } else {
          toast.error('Unexpected error: ' + error);
        }
      } else {
        toast.error('Unexpected error: ' + error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 my-5">Course Schedule</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <h3 className="text-xl font-bold">{course.name}</h3>
              <p className="text-gray-600">Start Date: {course.startDate}</p>
              <div className="relative">
                <select
                  value={selectedTime || ''}
                  onChange={handleSelectTime}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                  <option value="">Select Time</option>
                  {course.times.map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => handleRegister(course.id)}
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSchedule;


     