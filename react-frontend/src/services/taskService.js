const baseUrl =
    "https://ckbqav81s2.execute-api.us-east-2.amazonaws.com/default/";
const url = {
    create: baseUrl + "create_task",
    get: baseUrl + "task_get",
    edit: baseUrl + "task_edit",
    delete: baseUrl + "task_delete",
};

export const databaseCreate = async (task) => {
    try {
        const response = await fetch(url.create, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export const databaseDelete = async (taskId) => {
    try {
        const response = await fetch(`${url.delete}/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export const databaseEdit = async (task) => {
    try {
        const response = await fetch(url.edit, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export const databaseGet = async () => {
    try {
        const response = await fetch(url.get, { method: "GET" });
        const json = await response.json();
        const parsedJson = JSON.parse(json.body);
        return parsedJson.tasks;
    } catch (error) {
        console.error(error);
    }
};
