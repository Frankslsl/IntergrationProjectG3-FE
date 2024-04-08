import React from 'react';
import { useAuth }from '../authContext'

const CourseSchedule: React.FunctionComponent = () => {
    const { user } = useAuth(); 

    return (
        <div>
        <h2>Courses List</h2>
        {/* Conditional rendering based on the user's state */}
        {user ? (
            <p>Welcome, {user.username}. Here's the list of available courses:</p>
            // You can render the list of courses here based on the user's details
        ) : (
            <p>Please log in to view the courses list.</p>
        )}
        </div>
    );
};

export default CourseSchedule;