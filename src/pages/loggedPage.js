import React, { useState } from "react"
import { LoggedNav } from "../components/logged/loggedNav";
import { useNavigate } from "react-router-dom";
import { useFetchUserData } from "../scripts/common/scripts";

export const LoggedPage = () => {
    const [user, setUser] = useState({}); 
    const navigate = useNavigate();
    useFetchUserData(navigate, setUser);
    return (
        <main>
            <LoggedNav/>
            <div className="contenedor container-center">
                <h1 className="text-light titulo animate__animated animate__fadeIn animate__slow">Bienvenido {user.user}</h1>
                <h3 className="text-light subtitulo animate__animated animate__fadeIn animate__delay-2s">No pierdas tiempo y empeza a optimar tu tiempo de trabajo</h3> 
                <a className="btn btn-outline-light" href="/tasks">Gestionar mis tareas</a>
            </div>
        </main>
    );
};