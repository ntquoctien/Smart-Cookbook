# Phase 3 YOLO Vision Backend Report

## Summary

Phase 3 adds a FastAPI backend for YOLO-based ingredient detection and wires the mobile scan flow to call the backend before falling back to the existing mock vision service. The mobile UI is intentionally kept simple: Ingredient Confirmation shows only ingredient name, quantity/count, and unit. Confidence scores, boxes, class IDs, raw labels, and raw detections are kept in backend internals or debug-only responses.

## Folder Structure Created

```text
ai-models/
  yolo/
    ingredients/
      best.pt
      labels.json
      README.md

backend/
  app/
    main.py
    core/
      config.py
    modules/
      vision/
        router.py
        service.py
        yolo_model.py
        schemas.py
        label_mapper.py
  scripts/
    inspect_yolo_classes.py
  uploads/
    vision/
      .gitkeep
  requirements.txt
  .env.example
  README.md
```

## Model Storage Location

The trained model file already exists at:

```text
ai-models/yolo/ingredients/best.pt
```

It was not duplicated.

## Actual Model Class Names

The model was inspected with:

```bash
python backend/scripts/inspect_yolo_classes.py --model ai-models/yolo/ingredients/best.pt
```

Actual `model.names`:

```text
0 person
1 bicycle
2 car
3 motorcycle
4 airplane
5 bus
6 train
7 truck
8 boat
9 traffic light
10 fire hydrant
11 stop sign
12 parking meter
13 bench
14 bird
15 cat
16 dog
17 horse
18 sheep
19 cow
20 elephant
21 bear
22 zebra
23 giraffe
24 backpack
25 umbrella
26 handbag
27 tie
28 suitcase
29 frisbee
30 skis
31 snowboard
32 sports ball
33 kite
34 baseball bat
35 baseball glove
36 skateboard
37 surfboard
38 tennis racket
39 bottle
40 wine glass
41 cup
42 fork
43 knife
44 spoon
45 bowl
46 banana
47 apple
48 sandwich
49 orange
50 broccoli
51 carrot
52 hot dog
53 pizza
54 donut
55 cake
56 chair
57 couch
58 potted plant
59 bed
60 dining table
61 toilet
62 tv
63 laptop
64 mouse
65 remote
66 keyboard
67 cell phone
68 microwave
69 oven
70 toaster
71 sink
72 refrigerator
73 book
74 clock
75 vase
76 scissors
77 teddy bear
78 hair drier
79 toothbrush
```

Important finding after replacing the model: `best.pt` exposes 140 food, ingredient, condiment, and cooking-related classes. It is no longer the COCO/default `yolov8n.pt` model.

## labels.json Mapping

`ai-models/yolo/ingredients/labels.json` was generated from the actual class names above. Obvious food or kitchen-related classes were mapped to Vietnamese names and units, for example:

```json
{
  "banana": { "name_vi": "chuối", "unit": "quả" },
  "apple": { "name_vi": "táo", "unit": "quả" },
  "orange": { "name_vi": "cam", "unit": "quả" },
  "broccoli": { "name_vi": "bông cải xanh", "unit": "cái" },
  "carrot": { "name_vi": "cà rốt", "unit": "củ" },
  "bowl": { "name_vi": "bát", "unit": "bát" }
}
```

Unmapped or uncertain labels use the original model class name as `name_vi` and unit `"cái"`.

## Unmapped or Uncertain Labels

The following labels are not reliable cooking ingredients for this project and were left as fallback mappings:

```text
person, bicycle, car, motorcycle, airplane, bus, train, truck, boat,
traffic light, fire hydrant, stop sign, parking meter, bench, bird, cat,
dog, horse, sheep, cow, elephant, bear, zebra, giraffe, backpack, umbrella,
handbag, tie, suitcase, frisbee, skis, snowboard, sports ball, kite,
baseball bat, baseball glove, skateboard, surfboard, tennis racket, chair,
couch, potted plant, bed, dining table, toilet, tv, laptop, mouse, remote,
keyboard, cell phone, sink, book, clock, vase, scissors, teddy bear,
hair drier, toothbrush
```

Several kitchen objects are mapped for readability but are still not ingredients: `bottle`, `wine glass`, `cup`, `fork`, `knife`, `spoon`, `microwave`, `oven`, `toaster`, and `refrigerator`.

## Backend Dependencies Added

`backend/requirements.txt` includes:

- `fastapi`
- `uvicorn[standard]`
- `python-multipart`
- `ultralytics`
- `pillow`
- `pydantic-settings`

## API Endpoints Created

Health:

```http
GET /health
GET /api/vision/health
```

Single image detection:

```http
POST /api/vision/detect-ingredients
Content-Type: multipart/form-data
Field: image
```

Batch detection:

```http
POST /api/vision/detect-ingredients/batch
Content-Type: multipart/form-data
Field: images
```

## Response Schema

Normal response with detections:

```json
{
  "success": true,
  "ingredients": [
    {
      "name": "chuối",
      "quantity": 2,
      "unit": "quả"
    }
  ]
}
```

No-detection response:

```json
{
  "success": true,
  "ingredients": [],
  "message": "No ingredients detected. Please try another photo or add ingredients manually."
}
```

When `VISION_DEBUG=false`, the backend does not return confidence scores, bounding boxes, class IDs, raw labels, or raw detections.

When `VISION_DEBUG=true`, a debug object may include raw detections, processing time, image count, and class counts for technical debugging only.

## Mobile Files Updated

- `mobile-app/src/config/api.ts`
- `mobile-app/src/services/visionApiService.ts`
- `mobile-app/src/screens/scan/AIScanningScreen.tsx`
- `mobile-app/src/screens/scan/IngredientConfirmationScreen.tsx`
- `mobile-app/src/types/ingredient.ts`

Mobile behavior:

- Uploads one or multiple image URIs to FastAPI using multipart form data.
- Converts backend `name`, `quantity`, and `unit` into app ingredient state.
- Falls back to `visionMockService` when backend calls fail or mock mode is enabled.
- Keeps manual add/edit/remove ingredient behavior.
- Removes user-facing confidence score rendering.

## Validation Results

- Backend dependency install: `python -m pip install -r backend/requirements.txt` completed successfully. `ultralytics` and related runtime packages were installed.
- Backend syntax/import check: `python -m compileall backend/app backend/scripts` passed.
- FastAPI import check: `python -c "from app.main import app; print(app.title)"` from `backend/` returned `Smart Cookbook AI Backend`.
- Health endpoint: local Uvicorn server returned `{"status":"ok"}` for `GET /health`.
- Vision health endpoint: local Uvicorn server returned model and labels available, loaded class names, and no error for `GET /api/vision/health`.
- YOLO class inspection: `python backend/scripts/inspect_yolo_classes.py --model ai-models/yolo/ingredients/best.pt` printed the actual 140 cooking ingredient and food-related class names.
- Single-image endpoint: `POST /api/vision/detect-ingredients` with a generated blank JPEG returned `success: true`, an empty `ingredients` array, and the no-detection message.
- Batch endpoint: `POST /api/vision/detect-ingredients/batch` with two generated blank JPEG uploads returned `success: true`, an empty `ingredients` array, and the no-detection message.
- Debug exclusion: with `VISION_DEBUG=false`, single and batch endpoint responses did not include `debug`, confidence scores, bounding boxes, class IDs, or raw detections.
- Missing image handling: `POST /api/vision/detect-ingredients` without a file returned the clean user-safe message `Missing image file.`
- Mobile typecheck: `npm run typecheck` passed in `mobile-app/`.
- Mobile compile check: `npx expo export --platform android` completed successfully.
- User-facing technical detail scan: no `Confidence:`, `formatConfidence`, `raw_detections`, `bounding`, `class_id`, or `debug` usage was found in mobile screens/components.
- Mock fallback: `AIScanningScreen` catches backend vision API failures and calls `visionMockService.detectIngredients(selectedImages)` before allowing ingredient review/manual edits.

## Known Issues

- Some labels are Nepalese/local ingredient names. They are valid model classes, but labels without a confident Vietnamese translation are intentionally kept as the original class name with unit `cái`.
- Mobile devices cannot usually reach `127.0.0.1` on the development computer. Configure `EXPO_PUBLIC_VISION_API_BASE_URL` for Android emulator, iOS simulator, or physical-device LAN access.
- The backend is local-development focused. Production deployment, authentication, rate limiting, and persistent storage remain out of scope.

## Next Recommended Phase

Phase 4 should use the backend ingredient output to drive a real recommendation API or data-backed recipe engine, and refine Vietnamese label translations for local ingredient names if needed.
