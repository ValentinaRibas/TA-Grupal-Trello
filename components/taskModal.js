export class TaskModal {
    constructor(modalElement, taskFormElement, tasks, onSave) {
        this.modalElement = modalElement;
        this.taskFormElement = taskFormElement;
        this.tasks = tasks;
        this.onSave = onSave;

        this.saveTaskButton = document.getElementById("save-task");
        this.cancelModalButton = document.getElementById("cancel-modal");
        this.modalTitle = document.getElementById("modal-title");

        this.saveTaskButton.addEventListener("click", this.saveTask.bind(this));
        this.cancelModalButton.addEventListener("click", this.closeModal.bind(this));
    }

    /**
     * Opens the modal with the given title and task data
     * @param {string} title the title of the modal
     * @param {object} task the task data
     * @returns void
     * @example
     * openModal("Nueva Tarea");
     * openModal("Editar Tarea", task);
     */
    openModal(title, task = null) {
        this.modalTitle.textContent = title;
        this.taskFormElement.innerHTML = ""

        // Creates the form fields
        const titleInput = this.createInput("title", "Título", "text", task ? task.title : "");
        const descriptionInput = this.createInput("description", "Descripción", "text", task ? task.description : "");
        const assignedSelect = this.createSelect("assigned", "Asignado a", ["Persona 1", "Persona 2", "Persona 3"], task ? task.assigned : "");
        const prioritySelect = this.createSelect("priority", "Prioridad", ["Alta", "Media", "Baja"], task ? task.priority : "");
        const statusSelect = this.createSelect("status", "Estado", ["Backlog", "To Do", "In Progress", "Blocked", "Done"], task ? task.status : "");
        const dueDateInput = this.createInput("dueDate", "Fecha límite", "date", task ? task.dueDate : "");

        // Appends the form fields to the form element
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("columns", "is-multiline");

        fieldContainer.appendChild(this.wrapInColumn(titleInput));
        fieldContainer.appendChild(this.wrapInColumn(descriptionInput));
        fieldContainer.appendChild(this.wrapInColumn(assignedSelect));
        fieldContainer.appendChild(this.wrapInColumn(prioritySelect));
        fieldContainer.appendChild(this.wrapInColumn(statusSelect));
        fieldContainer.appendChild(this.wrapInColumn(dueDateInput));

        this.taskFormElement.appendChild(fieldContainer);

        // Adds the hidden id input if the task exists
        if (task) {
            const hiddenIdInput = document.createElement("input");
            hiddenIdInput.type = "hidden";
            hiddenIdInput.name = "id";
            hiddenIdInput.value = task.id;
            this.taskFormElement.appendChild(hiddenIdInput);
        }

        this.modalElement.classList.add("is-active");
    }

    /**
     * Wraps the given element in a column div element
     * @param element the element to wrap
     * @returns the column div element
     * @example
     * wrapInColumn(titleInput);
     * wrapInColumn(descriptionInput);
     * wrapInColumn(assignedSelect);
     * wrapInColumn(prioritySelect);
     * wrapInColumn(statusSelect);
     * wrapInColumn(dueDateInput);
     */
    wrapInColumn(element) {
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("column", "is-half");
        columnDiv.appendChild(element);
        return columnDiv;
    }

    /**
     * Closes the modal and resets the form
     * @returns void
     */
    closeModal() {
        this.modalElement.classList.remove("is-active");
        this.taskFormElement.reset();
    }

    /**
     * Saves the task data from the form
     * @returns void
     * @example
     */
    saveTask() {
        const titleInput = document.getElementById("title");

        // Validates that the title input exists
        if (titleInput.value.trim() === "") {
            alert("El título es obligatorio");
            return;
        }

        // Gets the form data
        const formData = new FormData(this.taskFormElement);
        const taskData = {};
        for (const pair of formData.entries()) {
            taskData[pair[0]] = pair[1];
        }

        // Saves the task data
        if (taskData.id) {
            const taskIndex = this.tasks.findIndex(task => task.id === taskData.id);
            this.tasks[taskIndex] = taskData;
        } else {
            taskData.id = Date.now().toString();
            this.tasks.push(taskData);
        }

        this.closeModal();
        this.onSave();
    }

    /**
     * Creates an input field div element
     * @param {string} id the id of the input field
     * @param {string} labelText the label text of the input field
     * @param {string} type the type of the input field
     * @param {string} value the value of the input field
     * @returns the input field div element
     * @example
     * createInput("title", "Título", "text", task ? task.title : "");
     * createInput("description", "Descripción", "text", task ? task.description : "");
     */
    createInput(id, labelText, type, value = "") {
        const fieldDiv = document.createElement("div");
        fieldDiv.classList.add("field");
        fieldDiv.innerHTML = `
            <label class="label" for="${id}">${labelText}</label>
            <div class="control">
                <input class="input" type="${type}" id="${id}" name="${id}" value="${value}">
            </div>
        `;
        return fieldDiv;
    }

    /**
     * Creates a select field div element
     * @param {string} id the id of the select field
     * @param {string} labelText the label text of the select field
     * @param {Array} options the options of the select field
     * @param {string} selectedValue the selected value of the select field
     * @returns the select field div element
     * @example
     * createSelect("assigned", "Asignado a", ["Persona 1", "Persona 2", "Persona 3"], task ? task.assigned : "");
     * createSelect("priority", "Prioridad", ["Alta", "Media", "Baja"], task ? task.priority : "");
     */
    createSelect(id, labelText, options, selectedValue = "") {
        const fieldDiv = document.createElement("div");
        fieldDiv.classList.add("field");
        let optionsHtml = options.map(option => 
            `<option value="${option}" ${option === selectedValue ? "selected" : ""}>${option}</option>`
        ).join("");
        fieldDiv.innerHTML = `
            <label class="label" for="${id}">${labelText}</label>
            <div class="control">
                <div class="select">
                    <select id="${id}" name="${id}">
                        ${optionsHtml}
                    </select>
                </div>
            </div>
        `;
        return fieldDiv;
    }
}
