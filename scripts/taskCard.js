/**
 * Function to handle the task card modal
 */
document.addEventListener("DOMContentLoaded", function () {
    var showModal = document.getElementById("show-modal");
    var modal = document.getElementById("task-modal");
    var cancelButton = document.getElementById("cancel-button");
    var saveButton = document.getElementById("save-button");

    /**
     * This event listener is used to show the modal when the user clicks on the "Add Task" button
     */
    showModal.addEventListener("click", function () {
        modal.classList.add("is-active");
        loadTaskData();
    });

    /**
     * This event listener is used to close the modal when the user clicks on the "Cancel" button
     */
    cancelButton.addEventListener("click", function () {
        modal.classList.remove("is-active");
    });

    /**
     * This event listener is used to save the task data when the user clicks on the "Save" button
     */
    saveButton.addEventListener("click", function () {
        var titleInput = document.getElementById("task-title");
        var descriptionInput = document.getElementById("task-description");
        var assignedButton = document.getElementById("task-assigned");
        var priorityButton = document.getElementById("task-priority");
        var statusButton = document.getElementById("task-status");
        var dateInput = document.getElementById("task-date");

        if (titleInput.value.trim() === "") {
            alert("El título es obligatorio");
        } else {
            var taskData = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                assigned: assignedButton.textContent.trim(),
                priority: priorityButton.textContent.trim(),
                status: statusButton.textContent.trim(),
                date: dateInput.value
            };

            localStorage.setItem("taskData", JSON.stringify(taskData));
            console.log(taskData);
            alert("Tarea guardada exitosamente!");
            modal.classList.remove("is-active");
        }
    });

    /**
     * This function is used to load the task data from the local storage
     * and set the values in the input fields
     */
    function loadTaskData() {
        var taskData = JSON.parse(localStorage.getItem("taskData"));

        if (taskData) {
            document.getElementById("task-title").value = taskData.title;
            document.getElementById("task-description").value = taskData.description;
            document.getElementById("task-assigned").textContent = taskData.assigned || "Seleccionar persona";
            document.getElementById("task-priority").textContent = taskData.priority || "Seleccionar prioridad";
            document.getElementById("task-status").textContent = taskData.status || "Seleccionar estado";
            document.getElementById("task-date").value = taskData.date || "";
        }
    }

    /**
     * This function is used to handle the dropdowns in the modal
     */
    var dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        var button = dropdown.querySelector(".button");
        button.addEventListener("click", function(event) {
            event.stopPropagation();
            dropdown.classList.toggle("is-active");
        });
    });

    /**
     * This event listener is used to close the dropdowns when the user clicks outside of them
     */
    document.addEventListener("click", function() {
        dropdowns.forEach(function(dropdown) {
            dropdown.classList.remove("is-active");
        });
    });

    /**
     * This event listener is used to update the dropdown button text when the user clicks on a dropdown item
     */
    var dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            var text = this.textContent;
            var dropdown = this.closest(".dropdown");
            var button = dropdown.querySelector(".button span");
            button.textContent = text;
            dropdown.classList.remove("is-active");
        });
    });
});
