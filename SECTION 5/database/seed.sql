-- Sample CCTV Events Data

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
