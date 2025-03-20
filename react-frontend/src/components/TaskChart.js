import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TaskChart = ({ stats }) => {
    const data = {
        labels: ["To Do", "In Progress", "Completed"],
        datasets: [
            {
                label: "Tasks",
                data: Object.values(stats),
                backgroundColor: ["red", "orange", "green"],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: { precision: 0 },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default TaskChart;
