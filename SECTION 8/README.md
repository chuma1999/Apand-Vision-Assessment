# CCTV Event Dashboard

This is a Dockerized full-stack application that displays CCTV events from a PostgreSQL database in a browser dashboard.

It includes:

- Node.js + Express backend
- PostgreSQL database
- Docker Compose orchestration
- Frontend dashboard served from the app container

## Project Structure

SECTION 8/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── public/
│ ├── app.js
│ ├── index.html
│ └── style.css
├── database/
│ └── schema.sql
└── README.md

## Prerequisites

Before running this project, make sure you have installed:

- Git
- Docker Desktop
- Docker Compose

Verify installation:

bash
docker --version
docker compose version
git --version

## Get the Project from GitHub

Clone the repository:

bash
git clone <your-github-repository-url>

---

Move into the project folder:

bash
cd <repository-folder>

---

Then go to the Section 8 project folder:

bash
cd "SECTION 8"

## Run the App with Docker

From inside the Section 8 folder, start the app:

bash
docker compose up --build

This will:

- build the Node.js app container
- start PostgreSQL
- initialize the database schema
- seed sample CCTV event data
- run the web app on port 3000

## Access the App

Open this in your browser:

text
http://localhost:3000

## Database Details

The PostgreSQL database is configured in Docker Compose with:

- Database name: apandvision
- User: postgres
- Password: tonderai
- Port: 5432

The app connects using environment variables defined in docker-compose.yml.

## Reset the Database

If you want to reset the database and re-seed the sample data:

bash
docker compose down -v
docker compose up --build

This removes the Docker volume and recreates the database from scratch.

## Check the Data in PostgreSQL

To inspect the table directly:

bash
docker compose exec postgres psql -U postgres -d apandvision -c "SELECT \* FROM cctv_events;"

## API Endpoint

The backend exposes the event data through:

text
http://localhost:3000/api/events

This returns the CCTV events in JSON format.

## Troubleshooting

### App fails because cctv_events does not exist

This usually happens when the old PostgreSQL volume is reused. Reset it:

bash
docker compose down -v
docker compose up --build

### Port 3000 is already in use

Stop the app using that port and run again:

bash
lsof -i :3000

Or stop the process that is using the port, then rerun Docker Compose.

## Useful Commands

Start containers:

bash
docker compose up

---

Start containers in background:

bash
docker compose up -d

---

Stop containers:

bash
docker compose down

---

View logs:

bash
docker compose logs -f

### What I learnt on this SECTION

## What did I research?

- I researched the benefits of using Docker Because it has become popular in the software engineering industry.

- I researched how it works, what it is best for in applications production.

## Why did I choose it?

- I chose it because it makes a software portable, consistent, and easier to run and deploy.

- Its use of containers hosted on the cloud where by I don't need to have any dependencies installed
  manually on my computer for my software to run meaning anyone on any operating system can run this software
  without needing to manual have the dependencies installed on their computer.

## What did I learn?

- I learnt the power of docker as to how it fixes dependencies problem. As to the narrative "It works on my machine" problem.
  where by without Docker, your project depends on things installed on the computer eg npm modules. So someone else may have
  different versions and configuration. But With Docker you define the environment once and Docker reproduces it.

- I also learnt you don't need npm modules to installed locally when using docker.

- I also learnt that my development environment matches deployment, the environment is much more consistent.

- It is best for team in a company instead of spending hours installing and configuring everything, you may be able to run
  the docker build command and have the development environment running.

## How could APAND Vision use it?

- Consistent development environments were by every developer can work with the same Node/Python versions,
  databases, libraries, and system dependencies, reducing “works on my machine” problems.

- Faster onboarding. A new developer can clone a project and use Docker Compose to bring up the application
  and its dependencies instead of manually configuring databases and services.

- AI model isolation on that different AI projects can have different Python versions, CUDA/toolkit requirements,
  libraries, and model dependencies without interfering with one another.

- Better developer productivity on that developers spend less time installing and troubleshooting infrastructure
  and more time building the actual product.

- Docker can provide a common environment where AI models, agents, APIs, databases, and software services can
  be developed and orchestrated together.

## What difficulties did I encounter?

- On installing Docker to run on my machine and the commands workeing for me to create the docker containers.

- Connecting the docker Express JS and postgresSQL containers via the docker compose was tough but did manage to fix it.

- The understanding part of how modern and clean docker is and the changes it can bring to a project structure at first
  was unbelievable but then when the structure worked it was a thumbs ups.

## What would I improve if I had more time?

- Move the PostgreSQL username and password out of server.js and into a .env file for better security.

- Make the Node.js container wait until PostgreSQL is actually ready before starting the application.

- Improve the Docker volume and database initialization so data is safely preserved between container restarts.
