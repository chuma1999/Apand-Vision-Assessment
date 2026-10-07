/*
    This file takes the data from events.js,
    shuffles it and displays it on the dashboard.
*/

// =========================
// SHUFFLE FUNCTION
// =========================

function shuffle(array) {
  // Make a copy so the original array
  // is not changed.
  const shuffled = [...array];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

// =========================
// CREATE EVENTS
// =========================

function createEvents() {
  // Shuffle each type of data independently.
  const shuffledEvents = shuffle(eventTypes);
  const shuffledLocations = shuffle(locations);
  const shuffledTimes = shuffle(times);

  /*
        We need 10 camera assignments.

        but we only have 4 cameras, so we repeat
        the cameras until we have 10 positions.
    */

  const cameraList = [];

  for (let i = 0; i < 10; i++) {
    cameraList.push(cameras[i % cameras.length]);
  }

  // Shuffle the camera assignments.
  const shuffledCameras = shuffle(cameraList);

  // Create the final event objects.
  const events = [];

  for (let i = 0; i < 10; i++) {
    events.push({
      event: shuffledEvents[i],

      location: shuffledLocations[i],

      time: shuffledTimes[i],

      camera: shuffledCameras[i],
    });
  }

  return events;
}

// =========================
// DISPLAY EVENTS
// =========================

function displayEvents(events) {
  const table = document.getElementById("eventTable");

  table.innerHTML = "";

  events.forEach((event) => {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>${event.time}</td>

            <td>
                <span class="event-badge">
                    ${event.event}
                </span>
            </td>

            <td>
                <span class="camera">
                    ${event.camera}
                </span>
            </td>

            <td>
                ${event.location}
            </td>

        `;

    table.appendChild(row);
  });

  // Update total event count.
  document.getElementById("totalEvents").textContent = events.length;
}

// =========================
// COUNT EVENTS
// =========================

function countEvent(events, eventName) {
  return events.filter((event) => event.event === eventName).length;
}

// =========================
// UPDATE COUNTERS
// =========================

function updateCounters(events) {
  document.getElementById("personCount").textContent = countEvent(
    events,
    "Person Detected",
  );

  document.getElementById("vehicleCount").textContent = countEvent(
    events,
    "Vehicle Detected",
  );

  document.getElementById("motionCount").textContent = countEvent(
    events,
    "Motion Detected",
  );

  document.getElementById("offlineCount").textContent = countEvent(
    events,
    "Camera Offline",
  );

  document.getElementById("intrusionCount").textContent = countEvent(
    events,
    "Restricted Area Intrusion",
  );

  document.getElementById("unknownCount").textContent = countEvent(
    events,
    "Unknown Event",
  );
}

// =========================
// START PROTOTYPE
// =========================

const events = createEvents();

displayEvents(events);

updateCounters(events);
