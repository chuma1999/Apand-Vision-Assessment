# Apand Vision CCTV Event Prototype - Notes

## 1. What this project does

It handles only six CCTV events:

1. Person Detected
2. Vehicle Detected
3. Motion Detected
4. Camera Offline
5. Restricted Area Intrusion
6. Unknown Event

The buttons simulate what a detection system would send.

---

## 2. Files

### index.html

This is the interface.

It contains:

- Event counters
- Detection buttons
- Search box
- Event filter
- Event table

---

### style.css

It controls the appearance of the dashboard.

It is responsible for:

- UI/UX Design

---

### CCTV_EVENTS.js

This is the database/configuration file.

It contains:

- Detected Events array
- Six event types
- Camera names
- Camera locations

---

### CCTV_DATA_CONTROLER.js

This contains the application logic.

The most important function is:

addEvent()

It creates an event and adds it to the `events` array in the CCTV_EVENTS.js file.

---

## 3. How the CCTV Monitor works

- On our dashboard that is the index.html file a user clicks an event.

- And the CCTV_DATA_CONTROLER.js adds the event name, plus time, plus camera and location to the events array in the CCTV_EVENTS.js file.

- And the data stored is then mapped in the index.html file.

- Inside the detected events section.

- As for the camera number and location it filters from the cameras array
  in the CCTV_EVENTS.js file.

## How to use the application

- To use this application just run the index.html file in a browser and all loads well.
