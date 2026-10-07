-- Sample CCTV Events Data

INSERT INTO cctv_events (event_type, camera, location, status, event_time)
VALUES
  ('Person Detected', 'Camera 01', 'Location 1', 'NEW', NOW() - INTERVAL '5 minutes'),
  ('Vehicle Detected', 'Camera 02', 'Location 2', 'ACKNOWLEDGE', NOW() - INTERVAL '10 minutes'),
  ('Motion Detected', 'Camera 03', 'Location 3', 'RESOLVE', NOW() - INTERVAL '15 minutes'),
  ('Camera Offline', 'Camera 04', 'Location 4', 'NEW', NOW() - INTERVAL '20 minutes'),
  ('Restricted Area Intrusion', 'Camera 01', 'Location 5', 'NEW', NOW() - INTERVAL '25 minutes'),
  ('Unknown Event', 'Camera 02', 'Location 6', 'FALSE ALARM', NOW() - INTERVAL '30 minutes'),
  ('Person Detected', 'Camera 03', 'Location 7', 'NEW', NOW() - INTERVAL '35 minutes'),
  ('Vehicle Detected', 'Camera 04', 'Location 8', 'ACKNOWLEDGE', NOW() - INTERVAL '40 minutes'),
  ('Motion Detected', 'Camera 01', 'Location 9', 'RESOLVE', NOW() - INTERVAL '45 minutes'),
  ('Restricted Area Intrusion', 'Camera 02', 'Location 10', 'NEW', NOW() - INTERVAL '50 minutes');
