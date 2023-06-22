import React, { useState } from "react"
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import { Form } from "../../components/common/form";
import { LoggedNav } from "../../components/logged/loggedNav";
import { GroupTable } from "../../components/logged/groupTable";
import { addGroup } from "../../scripts/group/scripts";
import { useFetchUserData } from "../../scripts/common/scripts";
import { NotificationManager } from "react-notifications";

const fieldsAdd = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" }},
    { key: "password", name: "password", label: "Contraseña", prop: { type: "password" }}
];
const fieldsJoin = [
    { key: "id", name: "id", label: "ID Grupo", prop: { type: "text", InputProps: { startAdornment: <InputAdornment position="start">#</InputAdornment> }}},
    { key: "code", name: "code", label: "Contraseña", prop: { type: "password" }}
];

export const GroupData = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({}); 
    const [rows, setRows] = useState([]);
    const [data, setData] = useState({}); 
    useFetchUserData(navigate, setUser);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const sendRequest = async (newGroup, fields) => {
        data.user = user.id;
        const errors = await addGroup( newGroup, fields, data, setRows)
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else NotificationManager.success("Grupo agregado", "Exito", 2000);
    };
    const handleCreate = (e) => {
        e.preventDefault();
        data.date = format(new Date(), "yyyy-MM-dd");
        sendRequest(true, fieldsAdd);
    }
    const handleJoin = (e) => {
        e.preventDefault();
        sendRequest(false, fieldsJoin);
    }
    return (
        <main>
            <LoggedNav/>
            <div className="contenedor flex-row align-items-start justify-content-center">
                <section className="col-10 col-lg-4">
                    <div className="row">
                        <section className="col-lg-12"> 
                            <Form fields={fieldsAdd} handleSubmit={handleCreate} handleInputChange={handleInputChange} title={"Crear grupo"}/>
                        </section>
                        <section className="col-lg-12"> 
                            <Form fields={fieldsJoin} handleSubmit={handleJoin} handleInputChange={handleInputChange} title={"Unirse a grupo"}/>
                        </section>
                    </div> 
                </section>
                <section className="col-10 col-lg-7">
                    <GroupTable user={user.id} rows={rows} setRows={setRows}/>  
                </section>          
            </div>
        </main>
    );
}