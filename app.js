document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load tasks from local storage
    loadTasks();
    
    // Add task event
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    // Theme toggle event
    themeToggle.addEventListener('click', toggleTheme);
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        
        saveTasks();
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Function to create a task element
    function createTaskElement(text, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'task-item' + (isCompleted ? ' completed' : '');
        li.textContent = text;
        
        // Click to toggle completion
        li.addEventListener('click', function() {
            this.classList.toggle('completed');
            saveTasks();
        });
        
        // Double click to delete
        li.addEventListener('dblclick', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                this.remove();
                saveTasks();
            }
        });
        
        return li;
    }
    
    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(task => {
                const taskItem = createTaskElement(task.text, task.completed);
                taskList.appendChild(taskItem);
            });
        }
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = 'Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Light Mode';
        }
    }
});