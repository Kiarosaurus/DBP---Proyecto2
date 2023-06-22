import React, { useEffect } from "react";
import { DataTable } from "../common/table";
import { loadTasks, removeTask } from "../../scripts/task/scripts";
import { Close } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";

export const TaskTable = ({ user, rows, setRows }) => {
    const handleDelete = async (id) => {
        const errors = await removeTask(id);
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else {
            NotificationManager.warning("Tarea finalizada", "Exito", 2000);
            const response = await loadTasks(user);
            if (response) setRows(response);
        }
    };
    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 220 },
        { field: "description", headerName: "Descripción", align: "center", headerAlign: "center", width: 220 },
        { field: "assigns", headerName: "N° Asignaciones", align: "center", headerAlign: "center", width: 210 },
        { field: "actions", headerName:"Acciones", sortable: false, align: "center", headerAlign: "center", width: 100, disableColumnMenu: true,
            renderCell: (params) => 
                <div>
                    <button className="btn" title="Finalizar" onClick={() => handleDelete(params.row.id)}><Close className="text-danger"/></button>
                </div>
        }
    ];
    useEffect(() => {
        const fetchData = async () => {
            const response = await loadTasks(user);
            if (response) setRows(response);
        };
        fetchData();
    }, [setRows, user]);
    return <DataTable rows={rows} columns={columns} title={"Tareas disponibles"}/>;
};