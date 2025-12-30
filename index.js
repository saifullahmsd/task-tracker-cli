
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const FILE_PATH = path.join(__dirname, 'tasks.json');

// DATABASE LOGIC
// (Read)
function loadTasks() {

    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }

    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading file:", error.message);
        return [];
    }
}

// (Write) a task
function saveTasks(tasks) {
    try {

        fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error("Error writing file:", error.message);
    }
}

// CORE FEATURES (CRUD Operations)

// Add Task
function addTask(description) {
    if (!description) {
        console.log("Error: Please provide a task description.");
        return;
    }

    const tasks = loadTasks();
    let newId;
    if (tasks.length === 0) {
        newId = 1;
    } else {
        const lastTask = tasks[tasks.length - 1];
        newId = lastTask.id + 1;
    }
    const newTask = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update Task
function updateTask(id, newDescription) {
    if (!id || !newDescription) {
        console.log("Error: Please provide ID and new description.");
        return;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    saveTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
}

// Delete Task
function deleteTask(id) {
    if (!id) {
        console.log("Error: Please provide a Task ID to delete.");
        return;
    }

    let tasks = loadTasks();
    const initialLength = tasks.length;

    tasks = tasks.filter(t => t.id !== parseInt(id));

    if (tasks.length === initialLength) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    saveTasks(tasks);
    console.log(`Task ${id} deleted successfully.`);
}

// Mark Task (In Progress / Done)
function markTask(id, status) {
    if (!id) {
        console.log("Error: Please provide a Task ID.");
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();

    saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}

// List Tasks
function listTasks(filterStatus = null) {
    const tasks = loadTasks();

    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    // filterStatus 
    const filteredTasks = filterStatus
        ? tasks.filter(t => t.status === filterStatus)
        : tasks;

    if (filteredTasks.length === 0) {
        console.log(`No tasks found with status: ${filterStatus}`);
        return;
    }

    console.log(`\nHere are your ${filterStatus || "all"} tasks:\n`);

    filteredTasks.forEach(task => {
        console.log(`[ID: ${task.id}] - ${task.description}`);
        console.log(`    Status: ${task.status}`);
        console.log(`    Created: ${task.createdAt}`);
        console.log(`    Updated: ${task.updatedAt}`);
        console.log("-------------------------------");
    });
}

// COMMAND HANDLING (Process.argv)
const args = process.argv.slice(2); // First 2 items skip 
const command = args[0]; // 'add', 'update', 'list', etc.
const arg1 = args[1];    // ID or Description or Filter
const arg2 = args[2];    // Description (for update)

switch (command) {
    case 'add':
        addTask(arg1);
        break;

    case 'update':
        updateTask(arg1, arg2);
        break;

    case 'delete':
        deleteTask(arg1);
        break;

    case 'mark-in-progress':
        markTask(arg1, 'in-progress');
        break;

    case 'mark-done':
        markTask(arg1, 'done');
        break;

    case 'list':
        listTasks(arg1);
        break;

    default:
        console.log("Unknown command. Available commands:");
        console.log("  add \"Task Description\"");
        console.log("  update <id> \"New Description\"");
        console.log("  delete <id>");
        console.log("  mark-in-progress <id>");
        console.log("  mark-done <id>");
        console.log("  list");
        console.log("  list done | list todo | list in-progress");
}