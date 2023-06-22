import { https } from "../scripts/common/scripts";

const path = "//localhost:5000"

export const groupsByUser = async (user) => {
    try {
        const response = await https.get(path + "/groups/" + user)
        if (response.status === 200) return response
        else throw new Error("Error: " + response.status)
    } catch (error) {
        return false;
    }
}

export const create = async (data) => {
    try {
        const response = await https.post(path + "/createGroup", {
            name: data.name, password: data.password, date: data.date, user: data.user
        });
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const join = async (data) => {
    try {
        const response = await https.post(path + "/joinGroup", {
            id: data.id, password: data.code, user: data.user
        });
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const deleteMember= async (data) => {
    try {
        const response = await https.post(path + "/deleteMember", {
            user: data.user, group: data.group
        });
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}