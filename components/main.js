import { TaskModal } from "./taskModal.js";
import { TaskColumns } from "./kanbanColumns.js";

document.addEventListener("DOMContentLoaded", () => {
    const tasks = [];
    
    const taskModal = new TaskModal(
        document.getElementById("task-modal"),
        document.getElementById("task-form"),
        tasks,
        () => taskColumns.renderColumns()
    );

    const taskColumns = new TaskColumns(
        document.getElementById("task-columns"),
        tasks,
        taskModal
    );

    document.getElementById("new-task-button").addEventListener("click", () => {
        taskModal.openModal("Nueva Tarea");
    });
});
