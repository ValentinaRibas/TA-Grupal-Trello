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

    document.getElementById("dark-mode-button").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.getElementById("dark-mode-button").classList.toggle("dark-mode");
        document.getElementById("columnas-ToDo").classList.toggle("dark-mode-columnas");
        document.getElementById("columnas-Backlog").classList.toggle("dark-mode-columnas");
        document.getElementById("columnas-Done").classList.toggle("dark-mode-columnas");
        document.getElementById("columnas-Blocked").classList.toggle("dark-mode-columnas");
        document.getElementById("columnas-InProgress").classList.toggle("dark-mode-columnas");
        document.getElementById("titulo-gestor").classList.toggle("tituloGestorDarkMode");
        
        //No logre aplicarle el Dark Mode al modal
        document.getElementById("modal-card-head").classList.toggle("dark-mode");
        document.getElementById("modal-card-body").classList.toggle("dark-mode");
        document.getElementById("modal-card-foot").classList.toggle("dark-mode");
    });

    document.getElementById("save-task").addEventListener("click", () =>{
        if(!document.getElementById("columnas-ToDo").classList.contains("dark-mode-columnas")){
            document.getElementById("columnas-ToDo").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Backlog").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Done").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Blocked").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-InProgress").classList.toggle("dark-mode-columnas");
        }
    })

   
});
