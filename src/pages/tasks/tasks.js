import React, { useState } from "react"
import { format } from "date-fns";
import { LoggedNav } from "../../components/logged/loggedNav";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/form";
import { TaskTable } from "../../components/logged/taskTable";
import { useFetchUserData } from "../../scripts/common/scripts";
import { AssignTask } from "./assign";
import { addTask } from "../../scripts/task/scripts";
import { NotificationManager } from "react-notifications";

const fields = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" } },
    { key: "description", name: "description", label: "Descripción", prop: { type: "text", multiline: true, rows: 4 } }
];

export const TaskData = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({}); 
    const [user, setUser] = useState({});
    const [rows, setRows] = useState([]);
    const [showForm, setShowForm] = useState(false);
    useFetchUserData(navigate, setUser);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const sendRequest = async (e) => {
        e.preventDefault();
        data.date = format(new Date(), "yyyy-MM-dd");
        data.user = user.id;
        const errors = await addTask(fields, data, setRows)
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else NotificationManager.success("Tarea creada", "Exito", 2000);
    };
    return (
        <main>
            <LoggedNav/>
            <div className="contenedor flex-row align-items-start justify-content-center">
                <section className="col-10 col-lg-4">
                    <div className="row">
                        <section className="col-lg-12">
                            <Form fields={fields} handleSubmit={sendRequest} handleInputChange={handleInputChange} title={"Crear Tarea"} />
                        </section>
                        <section className="col-lg-12">
                            <button className="btn btn-outline-light w-100" onClick={openForm}>
                                Asignar tarea a grupo
                            </button>
                        </section>
                    </div>
                </section>
                <section className="col-10 col-lg-7">
                    <TaskTable user={user.id} rows={rows} setRows={setRows}/>
                </section>
            </div>
            {showForm && <AssignTask handleClose={closeForm} user={user.id} setRows={setRows}/>}
        </main>
    );
};