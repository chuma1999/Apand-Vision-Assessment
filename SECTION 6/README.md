# A simple CCTV event monitoring application built with Node.js, Express, PostgreSQL, HTML, CSS, and JavaScript.

## 1. How to install dependencies

Before installing the project, make sure you have:

- Node.js installed
- npm installed
- PostgreSQL installed and running
- A PostgreSQL database created

The database used by this project is: apandvision

The PostgreSQL connection currently uses:

Host: localhost
Port: 5432
User: postgres
Password: tonderai
Database: apandvison

---

### Create the PostgreSQL Database

- Connect to the database: apandvision

- Then run the contents of: database/seed.sql

- The schema creates the cctv_events table.

- The table contains:

id
event_type
camera
location
status
event_time

---

### Install Dependencies

- Open a terminal inside the project directory: cd SECTION (NUMBER)

- Then install the required Node.js dependencies: npm install

- This installs: express, pg

- Express is used to create the Node.js web server and API.

- pg allows Node.js to communicate with PostgreSQL.

## 2. How to start the application

- Start the Node.js server with: npm start

- If everything is configured correctly, you should see: CCTV server running at http://localhost:3000

- The server is now running.

### Access the Dashboard

- Open your browser and go to: http://localhost:3000

- The CCTV dashboard will load.

## 3. How to access the API

- The application provides one API endpoint: GET /api/events

- The complete URL is: http://localhost:3000/api/events

- You can open this URL directly in your browser.

- You should receive JSON similar to:

[
{ "id": 1,
"event":
"Person Detected",
"camera": "Camera 01",
"location": "Main Entrance",
"time": "2026-10-06T18:30:00.000Z",
"status":
"NEW"
},
{ "id": 2,
"event":
"Vehicle Detected",
"camera": "Camera 02",
"location": "Parking Area",
"time": "2026-10-06T18:25:00.000Z",
"status":
"ACKNOWLEDGE"
}
]

- The API gets this information directly from PostgreSQL.

## 4. How to create an event

- You can create test events directly inside PostgreSQL.

- Connect to the: apandvision database

- And run:

INSERT INTO cctv_events
(event_type, camera, location, status)
VALUES
(
'Person Detected',
'Camera 01',
'Main Entrance',
'NEW'
);

Another example:

INSERT INTO cctv_events
(event_type, camera, location, status)
VALUES
(
'Vehicle Detected',
'Camera 02',
'Parking Area',
'ACKNOWLEDGE'
);

- After creating the records in PostgreSQL, refresh the dashboard.

- The new events will be retrieved through: GET /api/events

- And displayed on the dashboard.

## 5. How to retrieve events

- The recommended way for the frontend to retrieve events is through the API.

- Open: http://localhost:3000/api/events
