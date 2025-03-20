import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const TaskForm = ({ newTask, setNewTask, addTask }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Title"
                    fullWidth
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={addTask}
                >
                    Add Task
                </Button>
            </Grid>
        </Grid>
    );
};

export default TaskForm;
