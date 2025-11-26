// Task Manager Application
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize app
function init() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    renderTasks();
    updateStats();
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return alert('Please enter a task!');

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTasks();
    taskInput.value = '';
    renderTasks();
    updateStats();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    let filtered = tasks;
    if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

    taskList.innerHTML = '';

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    updateStats();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

// EDIT TASK (missing in your code)
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Stats
function updateStats() {
    document.getElementById('totalTasks').textContent = `${tasks.length} tasks`;
    document.getElementById('completedTasks').textContent =
        `${tasks.filter(t => t.completed).length} completed`;
}

init();
