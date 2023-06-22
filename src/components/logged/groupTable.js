import React, { useEffect } from "react";
import { DataTable } from "../common/table";
import { loadGroups, outGroup } from "../../scripts/group/scripts";
import { Edit, ExitToApp, Check, OpenInNew, Close } from '@mui/icons-material';
import { NotificationManager } from "react-notifications";

export const GroupTable = ({ user, rows, setRows }) => {
    const reload = async () => {
        const response = await loadGroups(user);
        if (response) setRows(response);
    }
    const handleEdit = (id) => {
        console.log("Editar ID:", id);
    }; 
    const handleDelete = async (id) => {
        const errors = await outGroup(user, id);
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else {
            NotificationManager.warning("Grupo eliminado", "Exito", 2000);
            reload();
        }
    };     
    const handleOpen = (id) => {
        console.log("Abrir ID:", id);
    };
    const columns = [
        { field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 100 },
        { field: "name", headerName: "Nombre", align: "center", headerAlign: "center", width: 220 },
        { field: "members", headerName: "Miembros", align: "center", headerAlign: "center", width: 180 },
        { field: "admin", headerName: "Permisos", align: "center", headerAlign: "center", width: 180,   
            renderCell: (params) => params.value === "Admin" ? <Check/> : <Close/> },
        { field: "actions", headerName:"Acciones", sortable: false, align: "center", headerAlign: "center", width: 180, disableColumnMenu: true,
            renderCell: (params) => 
                <div>
                    <button className="btn" title="Abrir" onClick={() => handleOpen(params.row.id)}><OpenInNew className="text-success"/></button>
                    <button className="btn" title="Editar" onClick={() => handleEdit(params.row.id)}><Edit className="text-warning"/></button>
                    <button className="btn" title="Salir" onClick={() => handleDelete(params.row.id)}><ExitToApp className="text-danger"/></button>
                </div>
        }
    ];
    useEffect(() => {
        const fetchData = async () => {
            const response = await loadGroups(user);
            if (response) setRows(response);
        };
        fetchData();
    }, [setRows, user]);
    return <DataTable rows={rows} columns={columns} title={"Grupos disponibles"}/>;
};