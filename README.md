# Smart Cookbook AI

Smart Cookbook AI is a mobile cooking assistant project with an Expo React Native app and a Phase 3 FastAPI YOLO vision backend.

## Mobile App

```bash
cd mobile-app
npm install
npm run typecheck
npm start
```

## Phase 3 YOLO Backend

Place the trained model at:

```text
ai-models/yolo/ingredients/best.pt
```

Install and run the backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Inspect YOLO class names from the project root:

```bash
python backend/scripts/inspect_yolo_classes.py --model ai-models/yolo/ingredients/best.pt
```

Test the vision API:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/api/vision/detect-ingredients -F "image=@path/to/photo.jpg"
```

The mobile app reads the backend base URL from `EXPO_PUBLIC_VISION_API_BASE_URL` when available. Use a reachable host for your target:

- Android emulator: `http://10.0.2.2:8000`
- iOS simulator: `http://127.0.0.1:8000`
- Physical device: `http://<your-computer-LAN-IP>:8000`

If the backend is unavailable, the app keeps the mock vision fallback and manual ingredient entry path.
