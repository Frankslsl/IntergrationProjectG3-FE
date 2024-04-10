import React from 'react';
import Navbar from './Navbar'; 
import { AuthProvider } from './authContext'; 
import SideMenu from '../dashboard/menulist/SideMenu';
interface DashboardProps {
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <AuthProvider>
        <div className="dashboard-layout">
            
            <Navbar/>
            <br/>
            <SideMenu />
            <div className="dashboard-content">
            {children}
            </div>
            
        </div>
        </AuthProvider>
    );
};

export default Dashboard;
