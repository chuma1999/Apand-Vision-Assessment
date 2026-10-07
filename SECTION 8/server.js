/*
    ==========================================
    CCTV MONITOR BACKEND
    ==========================================

    This server:

    - Connects to PostgreSQL
    - Serves the frontend
    - Provides GET /api/events
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
  user: process.env.DB_USER || "postgres",

  password: process.env.DB_PASSWORD || "tonderai",

  host: process.env.DB_HOST || "localhost",

  port: process.env.DB_PORT || 5432,

  database: process.env.DB_NAME || "apandvision",
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cctv_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(255) NOT NULL,
        camera VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        event_time TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(50) NOT NULL
      );
    `);

    const existingRows = await pool.query("SELECT 1 FROM cctv_events LIMIT 1;");

    if (existingRows.rowCount === 0) {
      await pool.query(`
        INSERT INTO cctv_events (event_type, camera, location, status, event_time)
        VALUES
          ('Person Detected', 'Camera 01', 'Lobby', 'NEW', NOW() - INTERVAL '5 minutes'),
          ('Vehicle Detected', 'Camera 02', 'Parking Lot', 'ACKNOWLEDGE', NOW() - INTERVAL '10 minutes'),
          ('Motion Detected', 'Camera 03', 'Back Door', 'RESOLVE', NOW() - INTERVAL '15 minutes'),
          ('Camera Offline', 'Camera 04', 'Warehouse', 'NEW', NOW() - INTERVAL '20 minutes'),
          ('Restricted Area Intrusion', 'Camera 01', 'Server Room', 'NEW', NOW() - INTERVAL '25 minutes'),
          ('Unknown Event', 'Camera 02', 'Main Entrance', 'FALSE ALARM', NOW() - INTERVAL '30 minutes'),
          ('Person Detected', 'Camera 03', 'Office Area', 'NEW', NOW() - INTERVAL '35 minutes'),
          ('Vehicle Detected', 'Camera 04', 'Loading Dock', 'ACKNOWLEDGE', NOW() - INTERVAL '40 minutes'),
          ('Motion Detected', 'Camera 01', 'Hallway', 'RESOLVE', NOW() - INTERVAL '45 minutes'),
          ('Restricted Area Intrusion', 'Camera 02', 'Storage', 'NEW', NOW() - INTERVAL '50 minutes');
      `);
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

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

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CCTV server running at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
