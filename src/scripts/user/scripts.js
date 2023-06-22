import { validateFields } from "../common/scripts";
import { login, register, authenticate, logout, getUserByID } from "../../apis/users"

export const handleUserSubmit = async (fields, data, registered) => {
    let errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    let response = registered? await login(data) : await register(data);
    if (response.error) return [response.error];
    else return [];
};

export const userLogged = async () => {
    const response = await authenticate();
    if(!response.error) return response.data;
    else return null;
}

export const userLogout = async () => {
    const response = await logout();
    if(response.error) return [response.error];
    else return null;
}

export const userData = async (user) => {
    const response = await getUserByID(user);
    if (response.error) return [response.error];
    else return response.data;
}