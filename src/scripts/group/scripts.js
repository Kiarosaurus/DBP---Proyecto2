import { validateFields } from "../common/scripts";
import { create, join, groupsByUser, deleteMember } from "../../apis/groups"

export const addGroup = async (newGroup, fields, data, setRows) => {
    let errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    let response = newGroup ? await create(data) : await join(data);
    if (response.error) return [response.error];
    else {
        setRows((prevRows) =>
            [...prevRows, {
                id: response.data.id,
                name: newGroup? data.name : response.data.name,
                admin: newGroup ? "Admin" : "No admin",
                members: newGroup ? 1 : response.data.members
            }]);
        return [];
    }
};

export const loadGroups = async (user) => {
    const newRows = [];
    const response = await groupsByUser(user);
    if (response) {
        const { groups, members, admins } = response.data;
        groups.map((group, index) =>
            newRows.push({
                id: group.id,
                name: group.name,
                admin: admins[index] ? "Admin" : "No admin",
                members: members[index]
            }));
    }
    return newRows;
};

export const outGroup = async (user, group) => {
    const response = await deleteMember({ user: user, group: group });
    if (response.error) return [response.error];
    else return [];
};