import { useState,useEffect } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";
import fetchCourseTypeQuery from "@/scenes/OurClasses/fetchCourseTypeQuery";
import { useQuery } from "@tanstack/react-query";

interface Course {
  id: number;
  name: string;
  image: string;
  description: string;
}
interface RegistrationListProps {
  onRegister: (tabId: string, courseId: number, courseName: string) => void;
}
// const mockCourses: Course[] = [
//   {
//     id: 1,
//     name: "Intro to Java",
//     image: "https://via.placeholder.com/150",
//     description: "Learn the basics of java..",
//   },
//   {
//     id: 2,
//     name: "Intro to React",
//     image: "https://via.placeholder.com/150",
//     description:
//       "Learn the basics of React, including components, state, and props.",
//   },
//   {
//     id: 3,
//     name: "Intro to Python",
//     image: "https://via.placeholder.com/150",
//     description: "Learn the basics of Python",
//   },
// ];

const RegistrationList = ({ onRegister }: RegistrationListProps) => {
  const { data } = useQuery<Course[]>({
    queryKey: ["courseTypes"],
    queryFn: fetchCourseTypeQuery,
  });

  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);


  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Login expired, please login again", {
        ...toastConfig,
        position: "top-center",
      });
      navigate("/signin");
    }
  });
  useEffect(() => {
    if (data) {
      const filtered = data.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [data, searchTerm]);

  //   const [courses, setCourses] = useState<Course[]>(mockCourses);
  //   const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     setCourses(mockCourses);
  //     console.log(courses);
  //     if (!token) {
  //       navigate("/signin");
  //       return;
  //     }

  //     const savedCourseId = localStorage.getItem("selectedCourseId");
  //     if (savedCourseId) {
  //       setSelectedCourseId(parseInt(savedCourseId, 10));
  //     }
  //   }, [navigate, logout]);

  const handleRegister = async (courseId: number, courseName: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please login.");
      navigate("/signin");
      return;
    }
    onRegister("course-schedule", courseId, courseName);
    // const registrationEndpoint = '/api/course/register';
    // try {
    //     const response = await axios.post(
    //         registrationEndpoint,
    //         { courseId },
    //         { headers: { Authorization: `Bearer ${token}` } }
    //     );

    //     if (response.status === 200) {
    //         setSelectedCourseId(courseId);
    //         localStorage.setItem('selectedCourseId', courseId.toString());
    //         toast.success('Course successfully registered');
    //     } else {
    //         toast.error('Registration failed: ' + response.data.message);
    //     }
    // } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         if (error.response && error.response.status === 401) {
    //             toast.error('Token expired, please log in again.');
    //             logout();
    //             navigate('/signin');
    //         } else if (error.response) {
    //             toast.error('Registration error: ' + error.response.data);
    //         } else {
    //             toast.error('Unexpected error: ' + error);
    //         }
    //     } else {
    //         toast.error('Unexpected error: ' + error);
    //     }
    //}
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Courses List</h2>
      <div className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        />
        {filteredCourses.map((course) => (
          <div key={course.id} className="mb-4 flex items-start">
            <img
              src={`data:image/jpeg;base64,${course.image}`}
              alt={course.name}
              className="w-32 h-32 mr-4"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{course.name}</h3>
              <p className="mb-4">{course.description}</p>
              <button
                onClick={() => handleRegister(course.id, course.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                style={{ width: "150px", height: "40px" }}
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationList;