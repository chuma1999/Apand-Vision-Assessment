# CCTV Event Monitor - SECTION 5 Setup Guide

This is a full-stack CCTV event monitoring application with PostgreSQL backend.

## Architecture

Browser (Frontend)
↓
GET /api/events
↓
Express.js Server (Node.js)
↓
PostgreSQL Database

## Prerequisites

- **PostgreSQL** (v12+)
- **Node.js** (v14+)
- **npm** (comes with Node.js)

## Installation & Setup

### Step 1: Create PostgreSQL Database

Open Gitbash:

bash
psql -U postgres

---

In the PostgreSQL prompt:

sql
CREATE DATABASE apandvision;

### Step 2: Create Database Table

bash
psql -U postgres -d apandvision -f database/schema.sql

### Step 3: (Optional) Add Sample Data

bash
psql -U postgres -d apandvision -f database/seed.sql

### Step 4: Install Dependencies

bash
npm install

### Step 5: Start the Server

bash
npm start

You should see:
CCTV server running at http://localhost:3000

### Step 6: Open in Browser

Go to: **http://localhost:3000**
