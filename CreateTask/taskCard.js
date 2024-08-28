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

let tasks = []; // Array para almacenar las tareas

// Función para crear el HTML de una columna
function createColumn(status) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column', 'is-one-fifth'); // Ajusta el ancho de columna 
  columnDiv.innerHTML = `
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">${status}</p>
      </header>
      <div class="card-content" id="column-${status.replace(/\s+/g, '')}">
      </div>
    </div>
  `;
  return columnDiv;
}

// Función para crear el HTML de una tarea
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('card', 'mb-3', 'task-card');
  taskDiv.dataset.taskId = task.id; // Agregar ID único a la tarjeta
  taskDiv.innerHTML = `
    <div class="card-content">
      <p class="title is-5">${task.title}</p>
      <p class="subtitle is-6">Prioridad: ${task.priority}</p>
      <p class="subtitle is-6">Asignado a: ${task.assigned}</p> 
    </div>
  `;

  taskDiv.addEventListener('click', () => {
    // Buscar la tarea en el array 'tasks' usando el ID
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

// Función para abrir el modal
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

// Función para cerrar el modal
function closeModal() {
  taskModal.classList.remove('is-active');
  taskForm.reset();
}

// Función para guardar/actualizar una tarea
function saveTask() {
  const titleInput = document.getElementById('title'); // Obtenemos el elemento del título

  if (titleInput.value.trim() === '') { 
    alert('No se puede guardar la tarea sin un título');
    return; // Detener el proceso de guardar
  }

  const formData = new FormData(taskForm);
  const taskData = {};
  for (const pair of formData.entries()) {
    taskData[pair[0]] = pair[1];
  }

  if (taskData.id) {
    // Actualizar tarea
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    tasks[taskIndex] = taskData;
  } else {
    // Nueva tarea
    taskData.id = Date.now().toString(); // ID simple para la demostración
    tasks.push(taskData);
  }
  const idInput = taskForm.querySelector('input[name="id"]');
  if (idInput) {
    taskForm.removeChild(idInput); 
  }
  
  closeModal();
  loadTasksToColumns(); 
}

// Inicialización: Crear columnas al cargar la página
taskStatuses.forEach(status => {
  const column = createColumn(status);
  taskColumns.appendChild(column);
});

// Event Listeners
newTaskButton.addEventListener('click', () => openModal("Nueva Tarea"));
closeModalButton.addEventListener('click', closeModal);
cancelModalButton.addEventListener('click', closeModal);
saveTaskButton.addEventListener('click', saveTask);

// Cargar tareas desde localStorage o inicializar el array
loadTasksFromLocalStorage(); 
loadTasksToColumns();