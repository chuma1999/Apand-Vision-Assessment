/*
    ==========================================
    CCTV MONITOR BACKEND
    ==========================================

    This server:

    - Connects to PostgreSQL
    - Serves the frontend
    - Provides GET /api/events

    It DOES NOT:

    - POST
    - PUT
    - PATCH
    - DELETE
*/

const express = require("express");

const path = require("path");

const { Pool } = require("pg");

/*
    ==========================================
    EXPRESS
    ==========================================
*/

const app = express();

const PORT = 3000;

/*
    ==========================================
    POSTGRESQL CONNECTION
    ==========================================
*/

const pool = new Pool({
  user: "postgres",
  password: "tonderai",
  host: "localhost",
  port: 5432,
  database: "apandvision",
});

/*
    ==========================================
    FRONTEND
    ==========================================

    Express serves everything inside
    the public folder.
*/

app.use(express.static(path.join(__dirname, "public")));

/*
    ==========================================
    GET EVENTS
    ==========================================

    This is the ONLY API endpoint.

    It reads events from PostgreSQL.
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

                    ORDER BY
                        event_time DESC

                `);

    /*
                Send database results
                to the frontend.
            */

    res.json(result.rows);
  } catch (error) {
    console.error("PostgreSQL error:", error);

    res.status(500).json({
      error: "Unable to retrieve CCTV events.",
    });
  }
});

/*
    ==========================================
    START SERVER
    ==========================================
*/

app.listen(PORT, () => {
  console.log(`CCTV server running at http://localhost:${PORT}`);
});
