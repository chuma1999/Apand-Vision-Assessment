/*
    This file is responsible for:

    1. Getting events from the backend
    2. Displaying events
    3. Creating event counters
    4. Creating filters
    5. Filtering the events already downloaded
*/

let events = [];

/*
    These values should match the values
    stored in PostgreSQL.
*/

const eventTypes = [
  "Person Detected",
  "Vehicle Detected",
  "Motion Detected",
  "Camera Offline",
  "Restricted Area Intrusion",
  "Unknown Event",
];

const cameras = ["Camera 01", "Camera 02", "Camera 03", "Camera 04"];

const statuses = ["NEW", "ACKNOWLEDGE", "RESOLVE", "FALSE ALARM"];

/*
    Get events from our Node.js server.

    The browser does NOT connect directly
    to PostgreSQL.

    Instead:

    Browser
        ↓
    GET /api/events
        ↓
    Node.js
        ↓
    PostgreSQL
*/

async function loadEvents() {
  try {
    const response = await fetch("/api/events");

    if (!response.ok) {
      throw new Error("Failed to get events");
    }

    events = await response.json();

    updateCounters();

    setupFilters();

    applyFilters();
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

/*
    Display events inside the table.
*/

function displayEvents(eventList) {
  const tableBody = document.getElementById("eventTableBody");

  const emptyState = document.getElementById("emptyState");

  tableBody.innerHTML = "";

  /*
        If there are no events,
        show the empty message.
    */

  if (eventList.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  eventList.forEach((event) => {
    const row = document.createElement("tr");

    /*
            Convert PostgreSQL timestamp
            into a readable time.
        */

    const time = new Date(event.time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    row.innerHTML = `
            <td>${time}</td>

            <td>
                <span class="event-tag">
                    ${event.event}
                </span>
            </td>

            <td>${event.camera}</td>

            <td>${event.location}</td>

            <td>${event.status}</td>
        `;

    tableBody.appendChild(row);
  });
}

/*
    Filter the events that have already
    been downloaded from PostgreSQL.

    This does NOT make another database
    request.
*/

function applyFilters() {
  const selectedCamera = document.getElementById("cameraFilter").value;

  const selectedStatus = document.getElementById("statusFilter").value;

  const selectedEvent = document.getElementById("eventFilter").value;

  const filteredEvents = events.filter((event) => {
    const cameraMatches =
      selectedCamera === "all" || event.camera === selectedCamera;

    const statusMatches =
      selectedStatus === "all" || event.status === selectedStatus;

    const eventMatches =
      selectedEvent === "all" || event.event === selectedEvent;

    return cameraMatches && statusMatches && eventMatches;
  });

  displayEvents(filteredEvents);

  document.getElementById("eventCount").textContent =
    `${filteredEvents.length} events`;
}

/*
    Create the six event counters.
*/

function updateCounters() {
  const counters = document.getElementById("counters");

  counters.innerHTML = eventTypes
    .map((type) => {
      const count = events.filter((event) => event.event === type).length;

      return `
                <div class="counter">

                    <span class="counter-number">
                        ${count}
                    </span>

                    <span class="counter-label">
                        ${type}
                    </span>

                </div>
            `;
    })
    .join("");
}

/*
    Create the dropdown filter options.
*/

function setupFilters() {
  const cameraFilter = document.getElementById("cameraFilter");

  const statusFilter = document.getElementById("statusFilter");

  const eventFilter = document.getElementById("eventFilter");

  cameraFilter.innerHTML = `<option value="all">All Cameras</option>`;

  statusFilter.innerHTML = `<option value="all">All Statuses</option>`;

  eventFilter.innerHTML = `<option value="all">All Event Types</option>`;

  cameras.forEach((camera) => {
    cameraFilter.innerHTML += `
            <option value="${camera}">
                ${camera}
            </option>
        `;
  });

  statuses.forEach((status) => {
    statusFilter.innerHTML += `
            <option value="${status}">
                ${status}
            </option>
        `;
  });

  eventTypes.forEach((type) => {
    eventFilter.innerHTML += `
            <option value="${type}">
                ${type}
            </option>
        `;
  });

  /*
        Whenever a filter changes,
        filter the existing events.
    */

  cameraFilter.addEventListener("change", applyFilters);

  statusFilter.addEventListener("change", applyFilters);

  eventFilter.addEventListener("change", applyFilters);

  /*
        Add clear filters button handler
    */

  const clearButton = document.getElementById("clearFilters");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      cameraFilter.value = "all";
      statusFilter.value = "all";
      eventFilter.value = "all";
      applyFilters();
    });
  }
}

/*
    Start the application.
*/

loadEvents();
