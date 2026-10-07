/*
    CCTV Monitoring Backend

    This server ONLY READS events from PostgreSQL.

    There are NO:

    POST
    PUT
    PATCH
    DELETE

    requests in this application.
*/

const express = require("express");

const path = require("path");

const { Pool } = require("pg");

/*
    Create Express application.
*/

const app = express();

const PORT = 3000;

/*
    PostgreSQL connection.

    These are the database details
    for the local development database.
*/

const pool = new Pool({
  user: "postgres",
  password: "tonderai",
  host: "localhost",
  port: 5432,
  database: "apandvision",
});

/*
    Serve the frontend files
    from the public folder.

    This means:

    public/index.html
    public/style.css
    public/app.js

    can be accessed by the browser.
*/

app.use(express.static(path.join(__dirname, "public")));

/*
    GET /api/events

    This is the ONLY API endpoint
    we need for this application.

    It gets events from PostgreSQL.
*/

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(`

            SELECT
                id,
                event_type AS event,
                camera,
                location,
                event_time AS time,
                status
            FROM cctv_events
            ORDER BY event_time DESC
        `);

    /*
            Send PostgreSQL records
            to the frontend as JSON.
        */

    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      error: "Failed to get events from PostgreSQL",
    });
  }
});

/*
    Start the server.
*/

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
