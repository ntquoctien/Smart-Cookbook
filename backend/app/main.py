from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.vision.router import router as vision_router

app = FastAPI(title="Smart Cookbook AI Backend", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(vision_router)
