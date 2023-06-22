import React, { useState } from "react";
import { handleUserSubmit } from "../../scripts/user/scripts";
import { useNavigate } from "react-router-dom";
import { HomeNav } from "../../components/home/homeNav.js";
import { Form } from "../../components/common/form.js";
import { NotificationManager } from "react-notifications";

const fields = [
    { key: "name", name: "name", label: "Nombre", prop: { type: "text" }},
    { key: "user", name: "user", label: "Usuario", prop: { type: "text" }},
    { key: "password", name: "password", label: "Contraseña", prop: { type: "password" }},
    { key: "email", name: "email", label: "Email", prop: { type: "email" }},
    { key: "birthDate", name: "birthDate", prop: { type: "date" }}
];

export const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({}); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const sendRequest = async (e) => {
        e.preventDefault();
        const errors = await handleUserSubmit(fields, data, false);
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else{
            NotificationManager.success("Redirigiendo...", "Registro exitoso", 2000);
            setTimeout(() => navigate("/dashboard"), 2000);
        }
    };
    return (
        <main>
            <HomeNav/>
            <div className="contenedor">
                <section className="col-10 col-lg-4"> 
                    <Form fields={fields} handleSubmit={sendRequest} handleInputChange={handleInputChange} title={"Nuevo usuario"}/>
                </section>
            </div>
        </main>
    );
};