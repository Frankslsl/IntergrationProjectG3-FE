import React from "react";
import NavbarWrapper from "./Navbar";
import SideMenu from "../dashboard/menulist/SideMenu";
interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <NavbarWrapper />
      <br />
      <SideMenu />
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default Dashboard;
