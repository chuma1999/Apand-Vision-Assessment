/*
    CCTV Events Database Schema
*/


CREATE TABLE IF NOT EXISTS cctv_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    camera VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    event_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);