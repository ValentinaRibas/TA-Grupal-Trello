const taskColumns = document.getElementById('task-columns');
const newTaskButton = document.getElementById('new-task-button');
const taskModal = document.getElementById('task-modal');
const closeModalButton = document.getElementById('close-modal');
const cancelModalButton = document.getElementById('cancel-modal');
const taskForm = document.getElementById('task-form');
const saveTaskButton = document.getElementById('save-task');
const modalTitle = document.getElementById('modal-title');

const taskStatuses = [
  "Backlog", 
  "To Do", 
  "In Progress", 
  "Blocked", 
  "Done"
];

const priorities = [
  "Alta",
  "Media",
  "Baja"
];

const assignedTo = [
  "Persona 1",
  "Persona 2",
  "Persona 3"
];

let tasks = [];

function createColumn(status) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column', 'is-one-fifth'); 
  columnDiv.innerHTML = `
    <div class="column">
      <header class="card-header">
        <p class="card-header-title">${status}</p>
      </header>
      <div class="card-content" id="column-${status.replace(/\s+/g, '')}">
      </div>
    </div>
  `;
  return columnDiv;
}

function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('card', 'mb-3', 'task-card');
  taskDiv.dataset.taskId = task.id; 
  taskDiv.innerHTML = `
    <div class="card-content">
      <p class="title is-5">${task.title}</p>
      <p class="subtitle is-6">Prioridad: ${task.priority}</p>
      <p class="subtitle is-6">Asignado a: ${task.assigned}</p> 
    </div>
  `;

  taskDiv.addEventListener('click', () => {
    const taskToEdit = tasks.find(t => t.id === task.id);
    openModal("Editar Tarea", taskToEdit); 
  });

  return taskDiv;
}

function loadTasksToColumns() {
  taskStatuses.forEach(status => {
    const columnContent = document.getElementById(`column-${status.replace(/\s+/g, '')}`);
    columnContent.innerHTML = ''; 

    const tasksForStatus = tasks.filter(task => task.status === status);

    tasksForStatus.forEach(task => {
      const taskElement = createTaskElement(task);
      columnContent.appendChild(taskElement);
    });
  });
}

function openModal(title, task = null) {
  modalTitle.textContent = title;
  taskForm.innerHTML = ""; 

  const titleInput = createInput("title", "Título", "text", task ? task.title : "");
  const descriptionInput = createInput("description", "Descripción", "textarea", task ? task.description : "");
  const assignedSelect = createSelect("assigned", "Asignado a", assignedTo, task ? task.assigned : "");
  const prioritySelect = createSelect("priority", "Prioridad", priorities, task ? task.priority : "");
  const statusSelect = createSelect("status", "Estado", taskStatuses, task ? task.status : "");
  const dueDateInput = createInput("dueDate", "Fecha límite", "date", task ? task.dueDate : "");

  taskForm.appendChild(titleInput);
  taskForm.appendChild(descriptionInput);
  taskForm.appendChild(assignedSelect);
  taskForm.appendChild(prioritySelect);
  taskForm.appendChild(statusSelect);
  taskForm.appendChild(dueDateInput);

  if (task) {
    const hiddenIdInput = document.createElement('input');
    hiddenIdInput.type = 'hidden';
    hiddenIdInput.name = 'id';
    hiddenIdInput.value = task.id;
    taskForm.appendChild(hiddenIdInput);
  }

  taskModal.classList.add('is-active');
}

function createInput(id, labelText, type, value = "") {
  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('field');
  fieldDiv.innerHTML = `
    <label class="label" for="${id}">${labelText}</label>
    <div class="control">
      ${type === 'textarea' 
        ? `<textarea class="textarea" id="${id}" name="${id}">${value}</textarea>`
        : `<input class="input" type="${type}" id="${id}" name="${id}" value="${value}">`
      }
    </div>
  `;
  return fieldDiv;
}

function createSelect(id, labelText, options, selectedValue = "") {
  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('field');
  let optionsHtml = options.map(option => 
    `<option value="${option}" ${option === selectedValue ? "selected" : ""}>${option}</option>`
  ).join('');
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

function closeModal() {
  taskModal.classList.remove('is-active');
  taskForm.reset();
}

function saveTask() {
  const titleInput = document.getElementById('title'); 

  if (titleInput.value.trim() === '') { 
    alert('No se puede guardar la tarea sin un título');
    return; 
  }

  const formData = new FormData(taskForm);
  const taskData = {};
  for (const pair of formData.entries()) {
    taskData[pair[0]] = pair[1];
  }

  if (taskData.id) {
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    tasks[taskIndex] = taskData;
  } else {
    taskData.id = Date.now().toString(); 
    tasks.push(taskData);
  }
  const idInput = taskForm.querySelector('input[name="id"]');
  if (idInput) {
    taskForm.removeChild(idInput); 
  }
  
  closeModal();
  loadTasksToColumns(); 
}

taskStatuses.forEach(status => {
  const column = createColumn(status);
  taskColumns.appendChild(column);
});

newTaskButton.addEventListener('click', () => openModal("Nueva Tarea"));
closeModalButton.addEventListener('click', closeModal);
cancelModalButton.addEventListener('click', closeModal);
saveTaskButton.addEventListener('click', saveTask);

loadTasksFromLocalStorage(); 
loadTasksToColumns();