import React, { useState } from "react";
import { Form } from "../../components/common/form.js";
import { Close } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { addAssign, loadTasks } from "../../scripts/task/scripts";
import { NotificationManager } from "react-notifications";

const fields = [
    { key: "group", name: "group", label: "ID Grupo", prop: { type: "text", InputProps: { startAdornment: <InputAdornment position="start">#</InputAdornment> }}},
    { key: "task", name: "task", label: "ID Tarea", prop: { type: "text", InputProps: { startAdornment: <InputAdornment position="start">#</InputAdornment> }}}
];

export const AssignTask = ({ handleClose, user, setRows }) => {
    const [data, setData] = useState({}); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const sendRequest = async (e) => {
        e.preventDefault();
        data.user = user;
        const errors = await addAssign(fields, data)
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else {
            NotificationManager.success("Tarea asignada", "Exito", 2000);
            const response = await loadTasks(user);
            if (response) setRows(response);
        }
    };
    return (
        <div className="form-overlay">
            <section className="col-10 col-lg-4">
                <button className="btn btn-light float-end" title="Cerrar" onClick={handleClose}><Close/></button>
            </section>
            <section className="col-10 col-lg-4">
                <Form fields={fields} handleSubmit={sendRequest} handleInputChange={handleInputChange} title={"Asignación tarea"}/>
            </section>
        </div>
    );
};
