// The event list starts completely empty.
let events = [];

// Pick a random item from an array.
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Get the current time when an event is created.
function getCurrentTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// This is the main function called when an event button is clicked.
function addEvent(eventType) {
  const newEvent = {
    id: Date.now() + Math.random(),
    time: getCurrentTime(),
    event: eventType,
    camera: randomItem(cameras),
    location: randomItem(locations),
    status: "NEW",
  };

  // Add the new event to the events array.
  events.unshift(newEvent);

  updateCounters();
  applyFilters();
}

// Change the status of an existing event.
function changeStatus(eventId, newStatus) {
  const event = events.find((item) => item.id === eventId);

  if (!event) return;

  event.status = newStatus;
  applyFilters();
}

// Display the supplied events in the table.
function displayEvents(eventList) {
  const tableBody = document.getElementById("eventTableBody");
  const emptyState = document.getElementById("emptyState");

  tableBody.innerHTML = "";

  if (eventList.length === 0) {
    emptyState.style.display = "flex";

    if (events.length === 0) {
      emptyState.querySelector("p").textContent = "No events detected yet.";
      emptyState.querySelector("span").textContent =
        "Select an event above to add it to the event list.";
    } else {
      emptyState.querySelector("p").textContent = "No matching events.";
      emptyState.querySelector("span").textContent =
        "Try changing or clearing the selected filters.";
    }

    return;
  }

  emptyState.style.display = "none";

  eventList.forEach((event) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.time}</td>
      <td>
        <span class="event-tag">${event.event}</span>
      </td>
      <td>${event.camera}</td>
      <td>${event.location}</td>
      <td>
        <select class="status-select" data-id="${event.id}">
          ${statuses
            .map(
              (status) => `
            <option value="${status}" ${event.status === status ? "selected" : ""}>
              ${status}
            </option>
          `,
            )
            .join("")}
        </select>
      </td>
    `;

    tableBody.appendChild(row);
  });

  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      changeStatus(Number(event.target.dataset.id), event.target.value);
    });
  });
}

// Apply camera, status and event-type filters.
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
    `${filteredEvents.length} ${filteredEvents.length === 1 ? "event" : "events"}`;
}

// Update the six event counters using the events array.
function updateCounters() {
  const counters = document.getElementById("counters");

  counters.innerHTML = eventTypes
    .map((type) => {
      const count = events.filter((event) => event.event === type).length;

      return `
      <div class="counter">
        <span class="counter-number">${count}</span>
        <span class="counter-label">${type}</span>
      </div>
    `;
    })
    .join("");
}

// Build the filter options.
function setupFilters() {
  const cameraFilter = document.getElementById("cameraFilter");
  const statusFilter = document.getElementById("statusFilter");
  const eventFilter = document.getElementById("eventFilter");

  cameras.forEach((camera) => {
    cameraFilter.insertAdjacentHTML(
      "beforeend",
      `<option value="${camera}">${camera}</option>`,
    );
  });

  statuses.forEach((status) => {
    statusFilter.insertAdjacentHTML(
      "beforeend",
      `<option value="${status}">${status}</option>`,
    );
  });

  eventTypes.forEach((type) => {
    eventFilter.insertAdjacentHTML(
      "beforeend",
      `<option value="${type}">${type}</option>`,
    );
  });

  cameraFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);
  eventFilter.addEventListener("change", applyFilters);

  document.getElementById("clearFilters").addEventListener("click", () => {
    cameraFilter.value = "all";
    statusFilter.value = "all";
    eventFilter.value = "all";
    applyFilters();
  });
}

// Connect all six event buttons to addEvent().
function setupEventButtons() {
  document.querySelectorAll(".event-button").forEach((button) => {
    button.addEventListener("click", () => {
      addEvent(button.dataset.event);
    });
  });
}

// Initial page setup.
setupFilters();
setupEventButtons();
updateCounters();
applyFilters();
