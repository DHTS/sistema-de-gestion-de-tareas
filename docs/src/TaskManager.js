import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import TaskForm from "./components/TaskForm";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./components/TaskCard";
import TaskChart from "./components/TaskChart";
import {
    databaseCreate,
    databaseGet,
    databaseEdit,
    databaseDelete,
} from "./services/taskService";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: "",
        title: "",
        description: "",
        status: "0",
    });
    const [editingTitle, setEditingTitle] = useState(null);
    const [editingDescription, setEditingDescription] = useState(null);

    useEffect(() => {
        databaseGet().then(setTasks);
    }, []);

    const addTask = () => {
        if (newTask.title.trim() && newTask.description.trim()) {
            const taskWithId = { ...newTask, id: uuidv4() };
            setTasks([...tasks, taskWithId]);
            databaseCreate(taskWithId);
            setNewTask({ id: "", title: "", description: "", status: "0" });
        }
    };

    const updateTaskStatus = (id, status) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, status } : task))
        );
        databaseEdit({ id, status });
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        databaseDelete(id);
    };

    const updateTaskTitle = (selectecTask, title) => {
        setTasks(
            tasks.map((task) =>
                task.id === selectecTask.id ? { ...task, title } : task
            )
        );
        databaseEdit(selectecTask);
        setEditingTitle(null);
    };

    const updateTaskDescription = (selectedTask, description) => {
        setTasks(
            tasks.map((task) =>
                task.id === selectedTask.id ? { ...task, description } : task
            )
        );
        databaseEdit(selectedTask);
        setEditingDescription(null);
    };

    const startEditingTitle = (id) => {
        setEditingTitle(id);
    };

    const startEditingDescription = (id) => {
        setEditingDescription(id);
    };

    const getTaskStats = () => ({
        "To Do": tasks.filter((task) => task.status === "0").length,
        "In Progress": tasks.filter((task) => task.status === "1").length,
        Completed: tasks.filter((task) => task.status === "2").length,
    });

    return (
        <Container>
            <Typography variant="h4">Task Manager</Typography>
            <TaskForm {...{ newTask, setNewTask, addTask }} />
            <TaskChart stats={getTaskStats()} />
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={4} key={task.id}>
                        <TaskCard
                            {...{
                                task,
                                editingTitle,
                                editingDescription,
                                startEditingTitle,
                                startEditingDescription,
                                updateTaskTitle,
                                updateTaskDescription,
                                updateTaskStatus,
                                deleteTask,
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TaskManager;
