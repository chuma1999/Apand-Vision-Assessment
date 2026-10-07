// These are the fixed options used by the prototype.
// No database or IndexedDB is used.

const eventTypes = [
  "Person Detected",
  "Vehicle Detected",
  "Motion Detected",
  "Camera Offline",
  "Restricted Area Intrusion",
  "Unknown Event",
];

const cameras = ["Camera 01", "Camera 02", "Camera 03", "Camera 04"];

const locations = [
  "Main Entrance",
  "Parking Area",
  "Warehouse",
  "Restricted Area",
  "Rear Gate",
  "Loading Bay",
  "Office Entrance",
  "Delivery Gate",
  "Storage Area",
  "Side Entrance",
];

const statuses = ["NEW", "ACKNOWLEDGE", "RESOLVE", "FALSE ALARM"];
