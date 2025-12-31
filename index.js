require("dotenv").config();
const connectDB = require("./db");
const Task = require("./task.model");
const mongoose = require("mongoose");

async function main() {
    await connectDB();

    const args = process.argv.slice(2);
    const command = args[0];
    const arg1 = args[1];
    const arg2 = args[2];

    try {
        switch (command) {
            case "add":
                await addTask(arg1)
                break;

            case "list":
                await listTasks(arg1);
                break;

            case "delete":
                await deleteTask(arg1);
                break;

            case "update":
                await updateTask(arg1, arg2);
                break;

            case "mark-done":
                await updateStatus(arg1, "done");
                break;

            case "mark-in-progress":
                await updateStatus(arg1, "in-progress");
                break;

            default:
                console.log("Commands: add <desc>, list [filter], delete <id>, update <id> <desc>, mark-done <id>");
        }
    } catch (error) {
        console.error("Error:", error.message);
    } finally {

        await mongoose.connection.close();
        process.exit(0);
    }
}

// 1. Add Task 
async function addTask(description) {
    if (!description) {
        console.log("Error: Description is required");
        return;
    }

    const newTask = await Task.create({
        description: description,
        status: "todo"
    })
    console.log(`New task created [ID: ${newTask._id}]`);
}

// 2. List Tasks
async function listTasks(filterStatus = null) {
    let query = {};

    if (filterStatus) {
        query = { status: filterStatus }
    }

    const tasks = await Task.find(query)

    if (tasks.length === 0) {
        console.log("No tasks found");
        return;
    }
    console.log(`\n=== YOUR TASKS: (${filterStatus ? `Status: ${filterStatus}` : "All"}) ===\n`)

    tasks.forEach(task => {
        console.log(`ID: ${task._id} | ${task.description}`)
        console.log(`   Status: ${task.status}`);
        console.log(" ---------------------------------- ")
    })
}

// 3. Delete Task 
async function deleteTask(_id) {

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        console.log("Error: Invalid ID format. Please copy exact ID from list");
        return;
    }

    const result = await Task.findByIdAndDelete(_id);

    if (result) {
        console.log(`Task Deleted Successfully.`);
    } else {
        console.log(`Error: Task with ID ${_id} not found.`);
    }
}

// 4. Update Task 
async function updateTask(_id, newDescription) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        console.log("Error: Invalid ID format");
        return;
    }

    if (!newDescription) {
        console.log("Error: Description is required");
        return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
        _id,
        { description: newDescription },
        { new: true }
    );

    if (updatedTask) {

        console.log(`Task Updated: "${updatedTask.description}" Successfully.`)
    } else {
        console.log(`Error: Task with ID ${_id} not found.`)
    }
}

// 5. Update Status
async function updateStatus(_id, status) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        console.log("Error: Invalid ID format.");
        return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
        _id,
        { status: status },
        { new: true }
    );

    if (updatedTask) {
        console.log(`Task Status Updated to: '${status}'`);
    } else {
        console.log(`Error: Task not found.`);
    }
}


main();