import { TaskModal } from "./taskModal.js";
import { TaskColumns } from "./kanbanColumns.js";

document.addEventListener("DOMContentLoaded", () => {
    const tasks = [];
    
    // Creates the task modal and columns
    const taskModal = new TaskModal(
        document.getElementById("task-modal"),
        document.getElementById("task-form"),
        tasks,
        () => taskColumns.renderColumns()
    );

    // Creates the task columns
    const taskColumns = new TaskColumns(
        document.getElementById("task-columns"),
        tasks,
        taskModal
    );

    // Event listener for the new task button
    document.getElementById("new-task-button").addEventListener("click", () => {
        taskModal.openModal("Nueva Tarea");
    });

    // Event listener for the new task form
    const themeSwitch = document.getElementById("dark-mode-switch");
    const htmlElement = document.documentElement;

    // Event listener for the theme switch
    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            htmlElement.setAttribute("data-theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
        }
    });

    // Checks the theme switch based on the data-theme attribute
    if (htmlElement.getAttribute("data-theme") === "dark") {
        themeSwitch.checked = true;
    }
});
