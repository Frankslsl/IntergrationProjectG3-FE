import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";

interface CourseType {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Course {
  id: number;
  startDate: string;
  duration: string;
  courseType: CourseType;
}
interface RegisterCoursesProp{
  onRegister: (tabId: string, courseId?: number, courseName?: string) =>void;
}

const RegisteredCourses: React.FC<RegisterCoursesProp> = ({onRegister}) => {
  const { getAxios, user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) {
        toast.error("Please log in.", toastConfig);
        return;
      }
      try {
        const api = getAxios(token);
        const response = await api.get<Course[]>(`/api/course/courseList/${user.userId}`);
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

  const handleSelectCourse = (courseId: number) => {
    setSelectedCourseId(courseId);
  };
  const handleAddCourse = () =>{
    onRegister('RegistrationList');
  }

  const handleRemoveCourse = async () => {
    if (!selectedCourseId || !user) {
      toast.error("No course selected or user not found.", toastConfig);
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const api = getAxios(token);
      const response = await api.post(`/api/user/removeCourseFromUser/${user.userId}/${selectedCourseId}`);
      if (response.status === 200) {
        toast.success("Course successfully removed.", toastConfig);
        setCourses(prevCourses => prevCourses.filter(course => course.id !== selectedCourseId));
        setSelectedCourseId(null);
      } else {
        toast.error("Failed to remove course.", toastConfig);
      }
    } catch (error) {
      toast.error(`Failed to remove course: ${error}`, toastConfig);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Registered Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? courses.map(course => (
          <div key={course.id} className={`bg-white shadow overflow-hidden sm:rounded-lg p-4 cursor-pointer 
                    ${selectedCourseId === course.id ? "bg-blue-100 border-blue-500 border-2" : "hover:bg-gray-100"}`}
              onClick={() => handleSelectCourse(course.id)}>
            <div className="flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{course.courseType.name}</h3>
            </div>
            <div className="mt-2 mb-4">
              <p className="text-sm text-gray-500">Start Date: {course.startDate}</p>
              <p className="text-sm text-gray-500">Duration: {course.duration}</p>
              {selectedCourseId === course.id && (
                <button onClick={handleRemoveCourse} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none">
                  Remove
                </button>
              )}
            </div>
          </div>
        )) : <p className="text-sm text-gray-500">You have not registered for any courses yet.</p>}
      </div>
      <button
        onClick={handleAddCourse}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
      >
        Add Course
      </button>
    </div>
  );
};

export default RegisteredCourses;
