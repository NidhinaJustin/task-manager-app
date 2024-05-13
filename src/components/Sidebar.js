import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppContext } from "../AppContext";
/*
 * Component to dispay sidebar navs.by default Dashboard is kept active
 * The selectedOption state is kept inside context because we are using it in TakManager component to conditionally render.
 */
export default function Sidebar() {
  const { updateSideBarNav, selectedOption } = useAppContext();
  const sideBarList = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Projects", icon: <WorkIcon /> },
    { name: "Analytics", icon: <BarChartIcon /> },
    { name: "Notifications", icon: <NotificationsIcon /> },
  ];
  return (
    <>
      <h1>Tuktu</h1>
      {sideBarList.map((item) => (
        <p
          disabled={item.disabled}
          color="primary"
          className={`d-block mb-2 p-2 selectable ${
            selectedOption === item.name ? "selectedSidebarItem" : "sidebarItem"
          }`}
          key={item.name}
          onClick={() => updateSideBarNav(item.name)}
        >
          {item.icon}
          {item.name}
        </p>
      ))}
    </>
  );
}
