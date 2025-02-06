const tasks = [];

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const dueTime = parseInt(document.getElementById('dueTime').value);
    const priority = document.getElementById('priority').value;

    if (!title || isNaN(dueTime)) {
        alert('Please provide valid task details.');
        return;
    }

    const task = {
        title,
        dueTime: Date.now() + dueTime * 60000,
        priority
    };

    tasks.push(task);
    sortTasksByPriority();
    displayTasks();
    scheduleReminder(task);

    document.getElementById('taskTitle').value = '';
    document.getElementById('dueTime').value = '';
    document.getElementById('priority').value = 'High';
}

function sortTasksByPriority() {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = `${task.title} - Due in ${(task.dueTime - Date.now()) / 60000} minutes - Priority: ${task.priority}`;
        taskList.appendChild(li);
    });
}

function displayTasksDueWithin(minutes) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const now = Date.now();
    const filteredTasks = tasks.filter(task => (task.dueTime - now) <= minutes * 60000);
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = `${task.title} - Due in ${(task.dueTime - now) / 60000} minutes - Priority: ${task.priority}`;
        taskList.appendChild(li);
    });
}

// Simulate sending reminders
function scheduleReminder(task) {
    const delay = task.dueTime - Date.now();
    if (delay > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task.title} is due now!`);
        }, delay);
    }
}