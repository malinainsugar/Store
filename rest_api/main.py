from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine
from . import models, crud


from dotenv import load_dotenv
import uvicorn

# Команда для запуска сервера
# python -m uvicorn rest_api.main:app --reload

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
load_dotenv()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from .routers.products import router as products_router 
from .routers.users import router as users_router
from .routers.cart import router as cart_router
from .routers.orders import router as orders_router
from .routers.active_table import router as active_router


app.include_router(products_router, tags=["Products"])
app.include_router(users_router, tags=["Users"])
app.include_router(cart_router, tags=["Cart"])
app.include_router(orders_router, tags=["Orders"])
app.include_router(active_router, tags=["Active table"])


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse, tags=["Front"])
async def read_root():
    return HTMLResponse(content=open("static/index.html", "r", encoding="utf-8").read())

if __name__ == "__main__":
    uvicorn.run("rest_api.api:app", host="0.0.0.0", port=8000, reload=True, debug=True)