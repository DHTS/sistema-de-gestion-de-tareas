import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    IconButton,
    Button,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TaskCard = ({
    task,
    editingTitle,
    editingDescription,
    startEditingTitle,
    startEditingDescription,
    updateTaskTitle,
    updateTaskDescription,
    updateTaskStatus,
    deleteTask,
}) => {
    return (
        <Card>
            <CardContent>
                {editingTitle === task.id ? (
                    <TextField
                        fullWidth
                        defaultValue={task.title}
                        onBlur={(e) => updateTaskTitle(task.id, e.target.value)}
                        autoFocus
                    />
                ) : (
                    <Typography variant="h6">
                        {task.title}
                        <IconButton onClick={() => startEditingTitle(task.id)}>
                            <EditIcon />
                        </IconButton>
                    </Typography>
                )}

                <Typography style={{ whiteSpace: "pre-line" }}>
                    {editingDescription === task.id ? (
                        <TextField
                            fullWidth
                            multiline
                            defaultValue={task.description}
                            onBlur={(e) =>
                                updateTaskDescription(task.id, e.target.value)
                            }
                            autoFocus
                        />
                    ) : (
                        task.description
                    )}
                    <IconButton
                        onClick={() => startEditingDescription(task.id)}
                    >
                        <EditIcon />
                    </IconButton>
                </Typography>

                <Select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    fullWidth
                >
                    <MenuItem value="0">To Do</MenuItem>
                    <MenuItem value="1">In Progress</MenuItem>
                    <MenuItem value="2">Completed</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
