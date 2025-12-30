# Task Tracker CLI

A simple command-line tool to track your daily tasks. Built with Node.js.

## Description

This tool allows you to add, view, and manage tasks directly from your terminal. It saves all your tasks to a local `tasks.json` file, so they are not lost when you close the program.

## How to Install

1.  Make sure you have **Node.js** installed.
2.  Download this project folder.
3.  Open your terminal in this folder.

## How to Use

Run the commands using `node index.js`.

### 1. Add a Task
```bash
node index.js add "My new task"
```

### 2. List All Tasks
```bash
node index.js list
```

### 3. List by Status
See what you still need to do:
```bash
node index.js list todo
```
See what is finished:
```bash
node index.js list done
```

### 4. Update a Task
Change the description of a task (use the ID from the list):
```bash
node index.js update 1 "Updated task description"
```

### 5. Mark Task Status
Mark a task as "In Progress":
```bash
node index.js mark-in-progress 1
```
Mark a task as "Done":
```bash
node index.js mark-done 1
```

### 6. Delete a Task
Remove a task permanently:
```bash
node index.js delete 1
```

## Technical Details

*   **Language**: Node.js
*   **Database**: `tasks.json` (Local file)
*   **Libraries**: None (Uses built-in `fs` and `path`)

## Author

*   **Saif Ullah**

---
Happy Coding! 
