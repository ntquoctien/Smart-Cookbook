from __future__ import annotations

import json
from pathlib import Path

from ultralytics import YOLO


ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = ROOT / "ai-models" / "yolo" / "ingredients" / "best.pt"
LABELS_PATH = ROOT / "ai-models" / "yolo" / "ingredients" / "labels.json"

VIETNAMESE_LABELS: dict[str, tuple[str, str]] = {
    "Apple": ("táo", "quả"),
    "Artichoke": ("atisô", "cái"),
    "Ash Gourd -Kubhindo-": ("bí đao", "quả"),
    "Asparagus -Kurilo-": ("măng tây", "cây"),
    "Avocado": ("bơ", "quả"),
    "Bacon": ("thịt xông khói", "miếng"),
    "Bamboo Shoots -Tama-": ("măng", "cái"),
    "Banana": ("chuối", "quả"),
    "Beans": ("đậu", "phần"),
    "Beaten Rice -Chiura-": ("gạo dẹt", "phần"),
    "Beef": ("thịt bò", "phần"),
    "Beetroot": ("củ dền", "củ"),
    "Bitter Gourd": ("mướp đắng", "quả"),
    "Black Lentils": ("đậu lăng đen", "phần"),
    "Black beans": ("đậu đen", "phần"),
    "Bottle Gourd -Lauka-": ("bầu", "quả"),
    "Bread": ("bánh mì", "cái"),
    "Brinjal": ("cà tím", "quả"),
    "Broad Beans -Bakullo-": ("đậu tằm", "phần"),
    "Broccoli": ("bông cải xanh", "cái"),
    "Buff Meat": ("thịt trâu", "phần"),
    "Butter": ("bơ sữa", "phần"),
    "Cabbage": ("bắp cải", "cái"),
    "Capsicum": ("ớt chuông", "quả"),
    "Carrot": ("cà rốt", "củ"),
    "Cassava -Ghar Tarul-": ("sắn", "củ"),
    "Cauliflower": ("súp lơ trắng", "cái"),
    "Chayote-iskus-": ("su su", "quả"),
    "Cheese": ("phô mai", "phần"),
    "Chicken": ("thịt gà", "phần"),
    "Chicken Gizzards": ("mề gà", "phần"),
    "Chickpeas": ("đậu gà", "phần"),
    "Chili Pepper -Khursani-": ("ớt", "quả"),
    "Chili Powder": ("bột ớt", "phần"),
    "Chowmein Noodles": ("mì chowmein", "phần"),
    "Cinnamon": ("quế", "thanh"),
    "Coriander -Dhaniya-": ("rau mùi", "bó"),
    "Corn": ("bắp", "trái"),
    "Cornflakec": ("ngũ cốc bắp", "phần"),
    "Crab Meat": ("thịt cua", "phần"),
    "Cucumber": ("dưa leo", "quả"),
    "Egg": ("trứng", "quả"),
    "Fish": ("cá", "con"),
    "Garden Peas": ("đậu Hà Lan", "phần"),
    "Garlic": ("tỏi", "củ"),
    "Ginger": ("gừng", "củ"),
    "Green Brinjal": ("cà tím xanh", "quả"),
    "Green Lentils": ("đậu lăng xanh", "phần"),
    "Green Mint -Pudina-": ("bạc hà", "bó"),
    "Green Peas": ("đậu xanh Hà Lan", "phần"),
    "Gundruk": ("rau lên men gundruk", "phần"),
    "Ham": ("giăm bông", "miếng"),
    "Ice": ("đá", "viên"),
    "Jack Fruit": ("mít", "miếng"),
    "Ketchup": ("tương cà", "phần"),
    "Lemon -Nimbu-": ("chanh vàng", "quả"),
    "Lime -Kagati-": ("chanh xanh", "quả"),
    "Long Beans -Bodi-": ("đậu đũa", "quả"),
    "Milk": ("sữa", "phần"),
    "Minced Meat": ("thịt băm", "phần"),
    "Mushroom": ("nấm", "cái"),
    "Mutton": ("thịt cừu", "phần"),
    "Okra -Bhindi-": ("đậu bắp", "quả"),
    "Olive Oil": ("dầu ô liu", "phần"),
    "Onion": ("hành tây", "củ"),
    "Onion Leaves": ("hành lá", "nhánh"),
    "Orange": ("cam", "quả"),
    "Paneer": ("paneer", "miếng"),
    "Papaya": ("đu đủ", "quả"),
    "Pea": ("đậu Hà Lan", "phần"),
    "Pear": ("lê", "quả"),
    "Pork": ("thịt heo", "phần"),
    "Potato": ("khoai tây", "củ"),
    "Pumpkin -Farsi-": ("bí đỏ", "quả"),
    "Radish": ("củ cải", "củ"),
    "Red Beans": ("đậu đỏ", "phần"),
    "Red Lentils": ("đậu lăng đỏ", "phần"),
    "Rice -Chamal-": ("gạo", "phần"),
    "Salt": ("muối", "phần"),
    "Sausage": ("xúc xích", "cây"),
    "Soy Sauce": ("nước tương", "phần"),
    "Soyabean -Bhatmas-": ("đậu nành", "phần"),
    "Sponge Gourd -Ghiraula-": ("mướp hương", "quả"),
    "Strawberry": ("dâu tây", "quả"),
    "Sugar": ("đường", "phần"),
    "Sweet Potato -Suthuni-": ("khoai lang", "củ"),
    "Tofu": ("đậu phụ", "miếng"),
    "Tomato": ("cà chua", "quả"),
    "Turnip": ("củ cải turnip", "củ"),
    "Wallnut": ("óc chó", "hạt"),
    "Water Melon": ("dưa hấu", "quả"),
    "Wheat": ("lúa mì", "phần"),
    "Yellow Lentils": ("đậu lăng vàng", "phần"),
    "beef": ("thịt bò", "phần"),
    "bell_pepper": ("ớt chuông", "quả"),
    "cabbage": ("bắp cải", "cái"),
    "carrot": ("cà rốt", "củ"),
    "cauliflower": ("súp lơ trắng", "cái"),
    "chicken": ("thịt gà", "phần"),
    "cucumber": ("dưa leo", "quả"),
    "egg": ("trứng", "quả"),
    "fish": ("cá", "con"),
    "garlic": ("tỏi", "củ"),
    "ginger": ("gừng", "củ"),
    "kimchi": ("kim chi", "phần"),
    "kumquat": ("tắc", "quả"),
    "lemon": ("chanh", "quả"),
    "mayonnaise": ("sốt mayonnaise", "phần"),
    "noodle": ("mì", "phần"),
    "onion": ("hành tây", "củ"),
    "pork": ("thịt heo", "phần"),
    "potato": ("khoai tây", "củ"),
    "seaweed": ("rong biển", "lá"),
    "shrimp": ("tôm", "con"),
    "small_pepper": ("ớt nhỏ", "quả"),
    "tofu": ("đậu phụ", "miếng"),
    "tomato": ("cà chua", "quả"),
}


def get_model_class_names() -> list[str]:
    model = YOLO(str(MODEL_PATH))
    names = model.names
    if isinstance(names, dict):
        return [str(names[index]) for index in sorted(names)]
    return [str(name) for name in names]


def main() -> None:
    labels: dict[str, dict[str, str]] = {}
    uncertain: list[str] = []
    for class_name in get_model_class_names():
        if class_name in VIETNAMESE_LABELS:
            name_vi, unit = VIETNAMESE_LABELS[class_name]
        else:
            name_vi, unit = class_name, "cái"
            uncertain.append(class_name)
        labels[class_name] = {"name_vi": name_vi, "unit": unit}

    LABELS_PATH.write_text(
        json.dumps(labels, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {LABELS_PATH} with {len(labels)} labels.")
    if uncertain:
        print("Uncertain labels:", ", ".join(uncertain))


if __name__ == "__main__":
    main()
