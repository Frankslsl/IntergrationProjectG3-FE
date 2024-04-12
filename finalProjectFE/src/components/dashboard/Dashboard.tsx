
import React from "react";
import Navbar from "./Navbar";
import SideMenu from "../dashboard/menulist/SideMenu";




interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <br />
      <SideMenu />
      <div className="dashboard-content">{children}</div>
      
      
    </div>
  );
};

export default Dashboard;
