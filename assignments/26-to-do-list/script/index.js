'use strict';

const taskInput = document.querySelector('#ntask');
const addButton = document.querySelector('.btn');
const taskListContainer = document.querySelector('.tdl__data-detail');
const filterButtons = document.querySelectorAll('.tdl__data-type li');
const counterElements = document.querySelectorAll('.tdl__info-number');

let tasks = [];
let currentFilter = 'all';

function createTask(taskName) {
  return {
    id: Date.now(),
    name: taskName,
    isDone: false,
  };
}

function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (task) {
      return task.isDone === false;
    });
  }

  if (currentFilter === 'completed') {
    return tasks.filter(function (task) {
      return task.isDone === true;
    });
  }

  return tasks;
}

function updateCounters() {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(function (task) {
    return task.isDone === true;
  }).length;
  const activeTasks = totalTasks - doneTasks;

  counterElements[0].textContent = totalTasks;
  counterElements[1].textContent = activeTasks;
  counterElements[2].textContent = doneTasks;
}

function escapeHTML(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderEmptyState() {
  taskListContainer.innerHTML = `
    <div class="no-data">
      <div class="no-data__icon">
        <img src="./img/layout-list-grey.svg" alt="">
      </div>
      <div class="no-data__text">
        <p class="no-data__text-title">No tasks yet</p>
        <p class="no-data__text-subtitle">Add your first task above to get started. Stay productive!</p>
      </div>
    </div>
  `;
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  updateCounters();

  if (filteredTasks.length === 0) {
    renderEmptyState();
    return;
  }

  taskListContainer.innerHTML = '<ul class="task-list"></ul>';
  const taskList = document.querySelector('.task-list');

  filteredTasks.forEach(function (task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-list__item';

    if (task.isDone === true) {
      taskItem.classList.add('task-list__item--done');
    }

    taskItem.innerHTML = `
      <label class="task-list__content">
        <input class="task-list__checkbox" type="checkbox" ${task.isDone ? 'checked' : ''}>
        <span class="task-list__name">${escapeHTML(task.name)}</span>
      </label>
      <div class="task-list__actions">
        <button class="task-list__button task-list__button--edit" type="button" aria-label="Edit task">✏️</button>
        <button class="task-list__button task-list__button--delete" type="button" aria-label="Delete task">🗑️</button>
      </div>
    `;

    const checkbox = taskItem.querySelector('.task-list__checkbox');
    const editButton = taskItem.querySelector('.task-list__button--edit');
    const deleteButton = taskItem.querySelector('.task-list__button--delete');

    checkbox.addEventListener('change', function () {
      toggleTaskStatus(task.id);
    });

    editButton.addEventListener('click', function () {
      editTask(task.id);
    });

    deleteButton.addEventListener('click', function () {
      deleteTask(task.id);
    });

    taskList.append(taskItem);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();

  if (taskName === '') {
    alert('Please input your task name first.');
    return;
  }

  const newTask = createTask(taskName);
  tasks.push(newTask);

  taskInput.value = '';
  taskInput.focus();

  renderTasks();
}

function toggleTaskStatus(taskId) {
  tasks = tasks.map(function (task) {
    if (task.id === taskId) {
      return {
        id: task.id,
        name: task.name,
        isDone: !task.isDone,
      };
    }

    return task;
  });

  renderTasks();
}

function editTask(taskId) {
  const selectedTask = tasks.find(function (task) {
    return task.id === taskId;
  });

  const updatedTaskName = prompt('Edit your task:', selectedTask.name);

  if (updatedTaskName === null) {
    return;
  }

  const trimmedTaskName = updatedTaskName.trim();

  if (trimmedTaskName === '') {
    alert('Task name cannot be empty.');
    return;
  }

  tasks = tasks.map(function (task) {
    if (task.id === taskId) {
      return {
        id: task.id,
        name: trimmedTaskName,
        isDone: task.isDone,
      };
    }

    return task;
  });

  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  renderTasks();
}

function setActiveFilter(selectedFilterButton) {
  filterButtons.forEach(function (filterButton) {
    filterButton.classList.remove('selected');
    filterButton.classList.add('non-selected');
  });

  selectedFilterButton.classList.add('selected');
  selectedFilterButton.classList.remove('non-selected');
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

filterButtons.forEach(function (filterButton) {
  filterButton.addEventListener('click', function () {
    currentFilter = filterButton.textContent.toLowerCase();
    setActiveFilter(filterButton);
    renderTasks();
  });
});

renderTasks();
