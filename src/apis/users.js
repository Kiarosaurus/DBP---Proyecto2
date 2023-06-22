import { https } from "../scripts/common/scripts";

const path = "//localhost:5000"

export const getUserByID = async (user) => {
    try {
        const response = await https.get(path + "/users/" + user);
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const authenticate = async () => {
    try {
        const response = await https.get(path + "/@me");
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const register = async (data) => {
    try {
        const response = await https.post(path + "/signup", {
            name: data.name, password: data.password, user: data.user, birthDate: data.birthDate, email: data.email
        });
        if (response.status === 200) return { error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const login = async (data) => {
    try {
        const response = await https.post(path + "/login", {
            password: data.password, user: data.user
        });
        if (response.status === 200) return { error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const logout = async () => {
    try {
        const response = await https.get(path + "/logout");
        if (response.status === 200) return { error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}