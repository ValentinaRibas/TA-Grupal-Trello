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

    document.getElementById("dark-mode-button").addEventListener("click", (event) => {
        if(document.getElementById("dark-mode-button").textContent === "Dark Mode: OFF"){
            document.body.classList.toggle("dark-mode");
            document.getElementById("dark-mode-button").classList.toggle("dark-mode");
            document.getElementById("columnas-ToDo").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Backlog").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Done").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Blocked").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-InProgress").classList.toggle("dark-mode-columnas");
            document.getElementById("titulo-gestor").classList.toggle("tituloGestorDarkMode");
            document.getElementById("dark-mode-button").textContent = "Dark Mode: ON";
            Array.from(document.getElementsByClassName("card-header-title")).forEach(element => {
                element.classList.toggle("tituloGestorDarkMode");
                //element.classList.toggle("card-header-title");
            });
        }else{
            document.getElementById("dark-mode-button").textContent = "Dark Mode: OFF"
            document.body.classList.toggle("dark-mode");
            document.getElementById("dark-mode-button").classList.toggle("dark-mode");
            document.getElementById("columnas-ToDo").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Backlog").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Done").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-Blocked").classList.toggle("dark-mode-columnas");
            document.getElementById("columnas-InProgress").classList.toggle("dark-mode-columnas");
            document.getElementById("titulo-gestor").classList.toggle("tituloGestorDarkMode");
            document.getElementById("dark-mode-button").textContent = "Dark Mode: OFF";
            Array.from(document.getElementsByClassName("card-header-title")).forEach(element => {
                element.classList.toggle("tituloGestorDarkMode");
               // element.classList.toggle("card-header-title");
            });
        }
        //No logre aplicarle el Dark Mode al modal
        //document.getElementById("modal-card-head").classList.toggle("dark-mode");
        //document.getElementById("modal-card-body").classList.toggle("dark-mode");
        //document.getElementById("modal-card-foot").classList.toggle("dark-mode");
    }); 
});
