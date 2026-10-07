# A simple application with a backend API (ToDo List) - Notes

## 1. Why I decided to use the PERN Stack. PERN(PostgreSQL, Express JS, React JS and Node JS) instead of python and fastAPI

- The reason is React JS is one of today's best modern frameworks for a creative and faster modeling of a frontend application. Because of its technology of reusable components via props and also has a large pool of best third party technologies for creative UI/UX designs like Tailwind CSS and GSAP.

- And on Node JS and Express JS, they are best for applications involving a lot of concurrent connections like a CCTV monitoring system.

- And lastly why PostgresSQL, its because odf its data structuring, you can have relational data bases and above all well structured.

NOTE: But I would also love to note that Python and FastAPI have some serious advantages especially when we are dealing with AI or Machine Learning projects. Just that currently I have limited knowledge on Python and FastAPI.

---

## 2. What does this project do

- In this Todo App, the user can create a todo item, can also update/edit a todo item and delete a todo item.

- A user can also get all todo items or get an todo item by its id.

---

## 3. Files

### App.jsx

This is the main page that contains and displays on our frontend application the other components files data that is ListTodos.jsx and InputTodo.jsx

### ListTodos.jsx

- Inside ListTodo we have a function that connects to the database and gets all the todos items in the database.

- This function gets the todos list via postgresSQL host portal and the page created by our API that is connected to the database that is the todos page and the data is mapped on to the frontend of our application.

- Then we have a delete function as well were the user can delete a todo item from the frontend app and it is asynchronously deleted in the postgresSQL database.

---

### InputTodo.jsx

- Inside InputTodo we have function that lets a user create a todo item and put it synchronously into the postgresSQL database and after that it asynchronously refreshes and load the newly edited database data of todos items.

---

### EditTodo.jsx

- Inside EditTodo we have the PUT method where the user can edit a already created todo item and synchronously the updated todo item updates also in the postgresSQL and the todo list asynchronously load loads the list data from the postgresSQL data base with the updated or edited todo item as well.

---

### db.js

- The db.js file contains the postgresSQL database credentials. That is the User, Password, host, port and database which is the name of the database.

---

### server.js

- Server js is the API control module it contains the database fetch functions for all the needed data from the postgresSQL database. And the data is put into ROUTES by NODE JS and EXPRESS JS.

### index.css

- I used tailwind css for all the UI/UX Designs.

4. How to run this Application

- Open the client folder and open your terminal and run npm install and it installs all the client side npm modules used to create this frontend.

- Open the server folder and do the same run npm install and all the server side npm modules will be installed.

- Make sure you have your postgreSQL Admin running with the same database name created with the same table schema.

- for the client side in terminal run npm run dev and for the sever side in terminal run npm start.
