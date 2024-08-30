export class TaskColumns {
    constructor(containerElement, tasks, modal) {
        this.containerElement = containerElement;
        this.tasks = tasks;
        this.modal = modal;
        this.taskStatuses = ["Backlog", "To Do", "In Progress", "Blocked", "Done"];

        this.renderColumns();
    }

    renderColumns() {
        this.containerElement.innerHTML = "";
        this.taskStatuses.forEach(status => {
            const column = this.createColumn(status);
            this.containerElement.appendChild(column);
        });
        this.loadTasksToColumns();
    }

    createColumn(status) {
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("column", "is-one-fifth");
        columnDiv.dataset.status = status;
        columnDiv.innerHTML = `
            <div class="column">
                <header class="card-header">
                    <p class="card-header-title">${status}</p>
                </header>
                <div class="card-content" id="column-${status.replace(/\s+/g, "")}" ondrop="event.stopPropagation(); return false;">
                </div>
            </div>
        `;
        columnDiv.addEventListener("dragover", this.allowDrop);
        columnDiv.addEventListener("drop", (event) => this.drop(event));
        return columnDiv;
    }

    loadTasksToColumns() {
        this.taskStatuses.forEach(status => {
            const columnContent = document.getElementById(`column-${status.replace(/\s+/g, "")}`);
            columnContent.innerHTML = ""; 

            const tasksForStatus = this.tasks.filter(task => task.status === status);

            tasksForStatus.forEach(task => {
                const taskElement = this.createTaskElement(task);
                columnContent.appendChild(taskElement);
            });
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("card", "mb-3", "task-card", `task-${task.status.replace(/\s+/g, "").toLowerCase()}`);
        taskDiv.dataset.taskId = task.id;
        taskDiv.draggable = true;
        taskDiv.ondragstart = (event) => this.drag(event);
        taskDiv.innerHTML = `
            <div class="card-content">
                <p class="title is-5">${task.title}</p>
                <p class="subtitle is-6">Prioridad: ${task.priority}</p>
                <p class="subtitle is-6">Asignado a: ${task.assigned}</p>
            </div>
        `;

        taskDiv.addEventListener("click", () => {
            const taskToEdit = this.tasks.find(t => t.id === task.id);
            this.modal.openModal("Editar Tarea", taskToEdit); 
        });

        return taskDiv;
    }

    drag(event) {
        event.dataTransfer.setData("text", event.target.dataset.taskId);
    }

    allowDrop(event) {
        event.preventDefault();
    }

    drop(event) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text");
        const newStatus = event.currentTarget.dataset.status;

        const taskToUpdate = this.tasks.find(task => task.id === taskId);
        taskToUpdate.status = newStatus;

        this.loadTasksToColumns();
    }
}
