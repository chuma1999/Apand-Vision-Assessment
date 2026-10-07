# CCTV Event Monitor - Complete Setup Guide

This is a full-stack CCTV event monitoring application that displays security events from a PostgreSQL database.

## Architecture

Browser (Frontend)
↓
GET /api/events
↓
Express.js Server (Node.js)
↓
PostgreSQL Database

---

## Prerequisites

- **PostgreSQL** (v12+)
- **Node.js** (v14+)
- **npm** (comes with Node.js)

---

## Installation & Setup

### Step 1: Create PostgreSQL Database

Open Gitbash:

bash
psql -U postgres

In the PostgreSQL prompt, run:

---

sql
CREATE DATABASE apandvision;

### Step 2: Create Database Table

Run the schema file to create the `cctv_events` table:

bash
psql -U postgres -d apandvision -f database/schema.sql

### Step 3: (Optional) Add Sample Data

To populate the database with 10 sample events:

bash
psql -U postgres -d apandvision -f database/seed.sql

### Step 4: Install Node.js Dependencies

bash
npm install

This installs:

- `express` - Web server framework
- `pg` - PostgreSQL client

### Step 5: Start the Server

bash
npm start

You should see: Server running at http://localhost:3000

### Step 6: Open in Browser

Navigate to: **http://localhost:3000**

javascript
const pool = new Pool({
user: "postgres", // Your PostgreSQL username
password: "", // Your PostgreSQL password
host: "localhost", // PostgreSQL server address
port: 5432, // PostgreSQL port
database: "apandvision", // Database name
});
