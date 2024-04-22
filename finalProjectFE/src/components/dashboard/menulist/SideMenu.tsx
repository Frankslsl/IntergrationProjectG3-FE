import { useState } from 'react';
import CourseSchedule from '../menulist/CourseSchedule';
import RegistrationList from '../menulist/RegistrationList';
import RegisteredCourses from '../menulist/RegisteredCourses';
import UserProfile from './UserProfile'; 

const SideMenu = () => {
    const [activeTab, setActiveTab] = useState<string>('register-courses');
    const [currentCourse, setCurrentCourse] = useState<{ id: number; name: string } | null>(null);

    const handleRegister = (tabId: string, courseId: number, courseName: string) => {
        setCurrentCourse({ id: courseId, name: courseName });
        setActiveTab(tabId);
    };


    const renderActiveTab = () => {
        switch (activeTab) {
            case 'register-courses':
                return <RegistrationList onRegister={handleRegister} />;
            case 'course-schedule':
                return currentCourse ? <CourseSchedule courseTypeId={currentCourse.id} courseTypeName={currentCourse.name} onRegister = {handleRegister} /> : <div>No course selected</div>;
            case 'my-courses':
                return <RegisteredCourses onRegister={()=> setActiveTab('Register-courses')}/>;
            case 'user-profile':
                return <UserProfile />;
            default:
                return <RegistrationList onRegister={handleRegister} />;
        }
    };

    return (
        <div className="flex">
            <nav className="w-30 flex-shrink-0">
                <ul className="flex flex-col space-y-2 p-4 bg-gray-800 text-white">
                    <li className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'register-courses' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('register-courses')}>
                        Courses List
                    </li>
                    <li className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'course-schedule' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('course-schedule')}>
                        Course Schedule
                    </li>
                    <li className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'my-courses' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('my-courses')}>
                        Registered Courses
                    </li>
                    <li className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'user-profile' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('user-profile')}>
                        UserProfile
                    </li>
                </ul>
            </nav>
            <div className="dashboard-content flex-grow p-4">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default SideMenu;
