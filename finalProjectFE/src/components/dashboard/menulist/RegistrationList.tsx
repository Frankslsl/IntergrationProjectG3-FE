import { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Course {
  id: number;
  name: string;
  image: string;
  description: string;
}

const mockCourses: Course[] = [
  { id: 1, name: "Intro to Java", image: 'https://via.placeholder.com/150', description: 'Learn the basics of Java.' },
  { id: 2, name: "Intro to React", image: 'https://via.placeholder.com/150', description: 'Learn the basics of React, including components, state, and props.' },
  { id: 3, name: "Intro to Python", image: 'https://via.placeholder.com/150', description: 'Learn the basics of Python.' },
];

const RegistrationList = () => {
    const { user, getAxios, logout } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setCourses(mockCourses); // Optionally, fetch courses from backend
        console.log(courses);
        if (!token || !user) {
            navigate('/signin');
            return;
        }

        const savedCourseId = localStorage.getItem('selectedCourseId');
        if (savedCourseId) {
            setSelectedCourseId(parseInt(savedCourseId, 10));
        }
    }, [navigate, logout, courses, user]);

    const handleRegister = async (courseId: number) => {
        if (!user) {
            toast.error('User not found, please login.');
            navigate('/signin');
            return;
        }

        const api = getAxios(localStorage.getItem('token')); // Utilize getAxios for authentication
        const registrationEndpoint = '/api/course/register';

        try {
            const response = await api.post(
                registrationEndpoint,
                {
                    courseId: courseId,
                    userId: user.userId // Include userId in the payload
                }
            );

            if (response.status === 200) {
                setSelectedCourseId(courseId);
                localStorage.setItem('selectedCourseId', courseId.toString());
                toast.success('Course successfully registered');
            } else {
                toast.error('Registration failed: ' + response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    toast.error('Token expired, please log in again.');
                    logout();
                    navigate('/signin');
                } else if (error.response) {
                    toast.error('Registration error: ' + error.response.data.message);
                } else {
                    toast.error('Unexpected error: ' + error.message);
                }
            } else {
                toast.error('Unexpected error: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Courses List</h2>
            <div className="flex flex-col gap-8">
                {courses.map((course) => (
                    <div key={course.id} className="mb-4 flex items-start">
                        <img src={course.image} alt={course.name} className="w-32 h-32 mr-4" />
                        <div className="flex flex-col justify-between">
                            <h3 className="text-lg font-bold mb-2">{course.name}</h3>
                            <p className="mb-4">{course.description}</p>
                            <button
                                onClick={() => handleRegister(course.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                                style={{ width: '150px', height: '40px' }}
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
