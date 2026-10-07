/*
    ==========================================
    CCTV CAMERA SEARCH APPLICATION
    ==========================================

    This frontend:

    - Gets events from PostgreSQL through the API
    - Displays the events
    - Counts event types
    - Allows camera searching
    - Validates camera searches
    - Filters by status
    - Filters by event type

    IMPORTANT:

    This frontend DOES NOT:

    - INSERT data
    - UPDATE data
    - DELETE data

    It only reads and filters data.
*/

/*
    ==========================================
    EVENTS
    ==========================================

    This array will be populated by
    PostgreSQL data returned by the API.
*/

let events = [];

/*
    ==========================================
    EVENT TYPES
    ==========================================
*/

const eventTypes = [
  "Person Detected",
  "Vehicle Detected",
  "Motion Detected",
  "Camera Offline",
  "Restricted Area Intrusion",
  "Unknown Event",
];

/*
    ==========================================
    STATUS TYPES
    ==========================================
*/

const statuses = ["NEW", "ACKNOWLEDGE", "RESOLVE", "FALSE ALARM"];

/*
    ==========================================
    LOAD EVENTS
    ==========================================

    This function calls:

        GET /api/events

    The API gets the data from PostgreSQL.
*/

async function loadEvents() {
  try {
    const response = await fetch("/api/events");

    /*
            Validate the API response.
        */

    if (!response.ok) {
      throw new Error("Failed to retrieve events.");
    }

    /*
            Convert the response into JSON.
        */

    events = await response.json();

    /*
            Make sure the API returned
            an array.
        */

    if (!Array.isArray(events)) {
      throw new Error("Invalid event data received.");
    }

    /*
            Update dashboard.
        */

    updateCounters();

    setupFilters();

    applyFilters();
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

/*
    ==========================================
    DISPLAY EVENTS
    ==========================================
*/

function displayEvents(eventList) {
  const tableBody = document.getElementById("eventTableBody");

  const emptyState = document.getElementById("emptyState");

  /*
        Clear the current table.
    */

  tableBody.innerHTML = "";

  /*
        If no results exist,
        show the empty state.
    */

  if (eventList.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  /*
        Add each event to the table.
    */

  eventList.forEach((event) => {
    const row = document.createElement("tr");

    /*
            Convert PostgreSQL timestamp
            into readable time.
        */

    const time = new Date(event.time).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    row.innerHTML = `

            <td>
                ${time}
            </td>


            <td>

                <span class="event-tag">

                    ${escapeHTML(event.event)}

                </span>

            </td>


            <td>
                ${escapeHTML(event.camera)}
            </td>


            <td>
                ${escapeHTML(event.location)}
            </td>


            <td>
                ${escapeHTML(event.status)}
            </td>

        `;

    tableBody.appendChild(row);
  });
}

/*
    ==========================================
    FILTER EVENTS
    ==========================================
*/

function applyFilters() {
  /*
        Get camera search text.
    */

  const cameraSearch = document.getElementById("cameraSearch").value.trim();

  /*
        Get status.
    */

  const selectedStatus = document.getElementById("statusFilter").value;

  /*
        Get event type.
    */

  const selectedEvent = document.getElementById("eventFilter").value;

  /*
        Camera error element.
    */

  const cameraError = document.getElementById("cameraError");

  /*
        Clear previous error.
    */

  cameraError.textContent = "";

  cameraError.style.display = "none";

  /*
        ======================================
        CAMERA VALIDATION
        ======================================

        If the user typed a camera name,
        check whether it exists in the
        PostgreSQL data already retrieved.
    */

  if (cameraSearch !== "") {
    const cameraExists = events.some((event) =>
      String(event.camera).toLowerCase().includes(cameraSearch.toLowerCase()),
    );

    /*
            If there is no matching camera,
            show an error.
        */

    if (!cameraExists) {
      cameraError.textContent = "Camera not found.";

      cameraError.style.display = "block";
    }
  }

  /*
        ======================================
        FILTER THE EVENTS
        ======================================
    */

  const filteredEvents = events.filter((event) => {
    /*
                Camera filter.

                Empty search means:
                show all cameras.

                Otherwise:
                match the typed camera.
            */

    const cameraMatches =
      cameraSearch === "" ||
      String(event.camera).toLowerCase().includes(cameraSearch.toLowerCase());

    /*
                Status filter.
            */

    const statusMatches =
      selectedStatus === "all" || event.status === selectedStatus;

    /*
                Event type filter.
            */

    const eventMatches =
      selectedEvent === "all" || event.event === selectedEvent;

    return cameraMatches && statusMatches && eventMatches;
  });

  /*
        Display filtered data.
    */

  displayEvents(filteredEvents);

  /*
        Update event count.
    */

  document.getElementById("eventCount").textContent =
    `${filteredEvents.length} events`;
}

/*
    ==========================================
    UPDATE COUNTERS
    ==========================================
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
    ==========================================
    SETUP FILTERS
    ==========================================
*/

function setupFilters() {
  const cameraSearch = document.getElementById("cameraSearch");

  const statusFilter = document.getElementById("statusFilter");

  const eventFilter = document.getElementById("eventFilter");

  /*
        Clear status options.
    */

  statusFilter.innerHTML = `

        <option value="all">
            All Statuses
        </option>

    `;

  /*
        Clear event options.
    */

  eventFilter.innerHTML = `

        <option value="all">
            All Event Types
        </option>

    `;

  /*
        Add status options.
    */

  statuses.forEach((status) => {
    statusFilter.innerHTML += `

            <option value="${status}">

                ${status}

            </option>

        `;
  });

  /*
        Add event type options.
    */

  eventTypes.forEach((type) => {
    eventFilter.innerHTML += `

            <option value="${type}">

                ${type}

            </option>

        `;
  });

  /*
        Camera search.

        The "input" event fires every time
        the user types.
    */

  cameraSearch.addEventListener("input", applyFilters);

  /*
        Status filter.
    */

  statusFilter.addEventListener("change", applyFilters);

  /*
        Event filter.
    */

  eventFilter.addEventListener("change", applyFilters);

  /*
        Clear button.

        This resets all filters to
        their default values.
    */

  const clearButton = document.getElementById("clearFilters");

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      cameraSearch.value = "";

      statusFilter.value = "all";

      eventFilter.value = "all";

      applyFilters();
    });
  }
}

/*
    ==========================================
    SECURITY HELPER
    ==========================================

    This prevents database values from being
    inserted directly as HTML.
*/

function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value ?? "";

  return div.innerHTML;
}

/*
    ==========================================
    START APPLICATION
    ==========================================
*/

loadEvents();
