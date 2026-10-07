## CURRENT PROJECT

PostgreSQL
↓
Node/Express
↓
Dashboard

## WITH AI POWERED

IP Cameras
↓
AI Vision
↓
AI Events
↓
Node/Express
↓
PostgreSQL
↓
Dashboard

## What computer-vision technology would I use?

- Python + OpenCV for handling the camera video streams and processing frames.

- OpenCV would be responsible for reading frames from an IP camera/RTSP stream.

- The AI model would then analyse selected frames rather than sending every frame to the backend.

- For example: Camera 02 → RTSP stream → OpenCV → AI model.

## What model or framework would I investigate?

- I would investigate YOLO (You Only Look Once) for object detection.

- It can detect objects such as people, cars, trucks, motorcycles, etc.

- I would start with a pretrained YOLO model rather than training my own model immediately.

- Later, I could investigate custom training if the system needs to recognise specific situations or objects.

## How would the AI generate an event?

- The AI should not create an event every time it sees a person. Instead, I would define rules.

For example:

Camera 02
↓
Person detected
↓
Person remains in restricted zone
for 5 seconds
↓
Confidence > 80%
↓
Generate event

The event could look like:

{
"event_type": "Restricted Area Intrusion",
"camera": "Camera 02",
"location": "Warehouse Entrance",
"confidence": 0.91,
"event_time": "2026-10-07T18:30:20"
}

The AI could eventually generate events such as:

- Person detected

- Vehicle detected

- Restricted-area intrusion

- Loitering

- Camera obstruction

## How would I send that event to my API?

- I would keep the AI service separate from the Node.js application.

IP Camera
↓
Python + OpenCV
↓
YOLO
↓
AI Event
↓
POST /api/events
↓
Node.js / Express
↓
PostgreSQL
↓
CCTV Dashboard

- The Python AI service would send the event as JSON using an HTTP POST request.

## How would I deal with false detections?

- Confidence threshold: Ignore detections below something like 70–80%.

- Multiple-frame confirmation: I won't create an event from one frame. I will require the object to be detected across several frames.

- Time threshold: For loitering, for example, require the person to remain in the area for 10–30 seconds.

- Zone-based detection: Only trigger certain events when the object enters a predefined area.

- Cooldown: After generating an event, don't generate the same event 100 times in the next few seconds.

## What would you need to learn before implementing the complete system?

- OpenCV: reading and processing CCTV/RTSP video.

- YOLO: object detection and model inference.

- Python AI development: building the vision service.

- RTSP/ONVIF: connecting to actual IP cameras.

- Object tracking: tracking the same person/vehicle across frames.

- AI event logic: turning detections into meaningful events rather than raw detections.

- Docker: running the Node.js API, Python AI service and PostgreSQL together.

## Short Script in PYTHON

import cv2
import requests
from ultralytics import YOLO

model = YOLO("yolo11n.pt")
video = cv2.VideoCapture("sample.mp4")

API_URL = "http://localhost:3000/api/events"

while True:
ret, frame = video.read()

    if not ret:
        break

    results = model(frame, verbose=False)

    for result in results:
        for box in result.boxes:
            if int(box.cls[0]) == 0:  # 0 = person
                confidence = float(box.conf[0])

                if confidence >= 0.80:
                    requests.post(API_URL, json={
                        "event_type": "Person Detected",
                        "camera": "Camera 01",
                        "location": "Sample Location",
                        "confidence": confidence
                    })

                    print("Person detected:", confidence)

video.release()
