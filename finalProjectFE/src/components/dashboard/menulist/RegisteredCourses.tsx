import React from 'react';
import {useAuth}from '../authContext';


const RegisteredCourse: React.FunctionComponent = () => {
    const { user } = useAuth(); 

    return (
    <div>
        <h2>Registered Course</h2>
        {user ? (
        <p>Welcome, {user.username}. Here are your registered courses:</p>
        
        ) : (
        <p>Please log in to view your registered courses.</p>
        )}
    </div>
    );
}
export default RegisteredCourse;