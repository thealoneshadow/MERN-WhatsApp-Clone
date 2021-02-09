import React from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://media-exp1.licdn.com/dms/image/C5103AQFGylUbv8zeWQ/profile-displayphoto-shrink_200_200/0/1574150643740?e=1616025600&v=beta&t=IQ_RRPnBaStkr0_Ewn-CUxIc2NiNgppM-6-kIhBhjmc" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
        <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        </div>

    </div>
  );
}

export default Sidebar;
