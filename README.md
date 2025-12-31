# Task Tracker CLI

A simple command-line tool to track your daily tasks. Built with Node.js and MongoDB.

## Description

This tool allows you to add, view, and manage tasks directly from your terminal. It saves all your tasks to a **MongoDB Atlas** database, so your tasks are stored securely in the cloud and can be accessed from anywhere.

## How to Install

1.  Make sure you have **Node.js** installed.
2.  Download this project folder.
3.  Open your terminal in this folder.
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  Set up your environment variables:
    *   Create a `.env` file in the root directory.
    *   Add your MongoDB connection string:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        ```

## How to Use

Run the commands using `node index.js`.

### 1. Add a Task
```bash
node index.js add "My new task"
```

### 2. List All Tasks
This will show all tasks along with their unique MongoDB IDs.
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
Change the description of a task (copy the **ID** from the list command):
```bash
node index.js update <ID> "Updated task description"
```
*Example:* `node index.js update 63f1b2c... "Buy groceries"`

### 5. Mark Task Status
Mark a task as "In Progress":
```bash
node index.js mark-in-progress <ID>
```
Mark a task as "Done":
```bash
node index.js mark-done <ID>
```

### 6. Delete a Task
Remove a task permanently:
```bash
node index.js delete <ID>
```

## Technical Details

*   **Language**: Node.js
*   **Database**: MongoDB Atlas (Cloud Database)
*   **Libraries**: `mongoose` (ODM), `dotenv` (Environment Variables)

## Author

*   **Saif Ullah**

---
Happy Coding!
