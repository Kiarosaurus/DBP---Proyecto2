import { https } from "../scripts/common/scripts";

const path = "//localhost:5000"

export const tasksByUser = async (user) => {
    try {
        const response = await https.get(path + "/tasks/" + user)
        if (response.status === 200) return response
        else throw new Error("Error: " + response.status)
    } catch (error) {
        return false;
    }
}

export const create = async (data) => {
    try {
        const response = await https.post(path + "/createTask", {
            name: data.name, description: data.description, date: data.date, user: data.user
        });
        if (response.status === 200) return { data: response.data, error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const deleteTask = async (task) => {
    try {
        const response = await https.delete(path + "/deleteTask/" + task)
        if (response.status === 200) return { error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const createAssign = async (data) => {
    try {
        const response = await https.post(path + "/assignTask", {
            group: data.group, task: data.task, user: data.user
        });
        if (response.status === 200) return { error: null };
    } catch (error) {
        return { error: error.response.data.error };
    }
}