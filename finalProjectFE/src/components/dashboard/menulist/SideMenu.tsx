

import CourseSchedule from '../menulist/CourseSchedule';
import { useState } from 'react';
import RegistrationList from '../menulist/RegistrationList';
import RegisteredCourses from '../menulist/RegisteredCourses';
const SideMenu = () => {
    const [activeTab, setActiveTab] = useState<string>('register-courses'); 
    const renderActiveTab = () => {
        switch(activeTab) {
            case 'register-courses':
                return <RegistrationList />;
            case 'my-courses':
                return <RegisteredCourses />;
            case 'course-schedule':
                return <CourseSchedule />;
            default:
                return <RegistrationList />;
        }
    };

    return (
        <div className="flex">
            <nav className="w-30 flex-shrink-0">
                <ul className="flex flex-col space-y-2 p-4 bg-gray-800 text-white">
                    <li 
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'register-courses' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('register-courses')}
                    >
                        Courses List
                    </li>
                    <li 
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'my-courses' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('my-courses')}
                    >
                        Registered Courses
                    </li>
                    <li 
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeTab === 'course-schedule' ? 'bg-gray-900' : ''}`}
                        onClick={() => setActiveTab('course-schedule')}
                    >
                        Course Schedule
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
