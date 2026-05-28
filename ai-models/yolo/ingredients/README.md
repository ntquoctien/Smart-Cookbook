# YOLO Ingredient Model

This folder stores the trained ingredient detection model for Phase 3.

Expected files:

- `best.pt` - trained Ultralytics YOLO model for cooking ingredient detection.
- `labels.json` - generated from the actual `model.names` classes inside `best.pt`.

Do not hand-write labels before inspecting the model. Run:

```bash
python backend/scripts/inspect_yolo_classes.py --model ai-models/yolo/ingredients/best.pt
```

Each `labels.json` key must exactly match a class name from `model.names`. If a Vietnamese name or unit is uncertain, keep the original class name as `name_vi`, use unit `cái`, and document it in the Phase 3 report.
