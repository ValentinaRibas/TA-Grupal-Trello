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

    const themeSwitch = document.getElementById("dark-mode-switch");
    const htmlElement = document.documentElement;

    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            htmlElement.setAttribute("data-theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
        }
    });

    if (htmlElement.getAttribute("data-theme") === "dark") {
        themeSwitch.checked = true;
    }
});
