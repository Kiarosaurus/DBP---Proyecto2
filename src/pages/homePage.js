import React, { useState } from "react";
import { handleUserSubmit } from "../scripts/user/scripts";
import { useNavigate } from "react-router-dom";
import { HomeNav } from "../components/home/homeNav.js";
import { Form } from "../components/common/form.js";
import { NotificationManager } from "react-notifications"

const fields = [
    { key: "user", name: "user", label: "Usuario", prop: { type: "text" }},
    { key: "password", name: "password", label: "Contraseña", prop: { type: "password" }}
];

export const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const sendRequest = async (e) => {
        e.preventDefault();
        const errors = await handleUserSubmit(fields, data, true);
        if (errors.length > 0) errors.map(error => NotificationManager.error(error, "Error", 3000))
        else {
            NotificationManager.success("Redirigiendo...", "Logeo exitoso", 2000);
            setTimeout(() => navigate("/dashboard"), 2000);
        }
    };
    return (
        <main>
            <HomeNav/>
            <div className="contenedor container-center flex-row justify-content-around">
                <section className="col-10 col-lg-5"> 
                    <h1 className="text-light titulo animate__animated animate__fadeIn animate__slow">Te damos la bienvenida</h1>
                    <h3 className="text-light subtitulo animate__animated animate__fadeIn animate__delay-2s">¿Eres nuevo?</h3> 
                    <a className="btn btn-outline-light w-100" href="/register">Registrate</a>                
                </section>
                <section className="col-10 col-lg-5"> 
                    <Form fields={fields} handleSubmit={sendRequest} handleInputChange={handleInputChange} title={"Iniciar de Sesión"}/>
                </section>
            </div>
       </main>
    )
}