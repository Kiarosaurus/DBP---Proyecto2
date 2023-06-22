import { useEffect } from "react";
import { userLogged } from "../user/scripts";
import axios from "axios";

export const https = axios.create({
    withCredentials: true,
});

export const useFetchUserData = (navigate, setUser) => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await userLogged();
            if (response) setUser(response);
            else navigate("/");
        }; 
        fetchData();
    }, [navigate, setUser]);
};

export const validateFields = (fields, data) => {
    const errors = [];
    fields.forEach((field) => {
        const { name, label } = field;
        const value = data[name] || "";
        if (!value.trim()) errors.push("El campo " + label + " es obligatorio");
    });
    return errors;
};