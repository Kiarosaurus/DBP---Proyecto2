import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Register } from "../../pages/users/register";
import { HomePage } from "../../pages/homePage";
import { Logout } from "../../pages/users/logout";
import { LoggedPage } from "../../pages/loggedPage";
import { GroupData } from "../../pages/groups/groups";
import { TaskData } from "../../pages/tasks/tasks";
import { NotificationContainer } from "react-notifications";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<LoggedPage/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/groups" element={<GroupData/>}/>
                <Route path="/tasks" element={<TaskData/>}/>
            </Routes>
            <NotificationContainer/>
        </BrowserRouter>
    );
}