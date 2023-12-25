from fastapi import FastAPI
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
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

FRONTEND_PATH = 'http://localhost:5173'


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
from .routers.chat import router as chat_router


app.include_router(products_router, tags=["Products"])
app.include_router(users_router, tags=["Users"])
app.include_router(cart_router, tags=["Cart"])
app.include_router(orders_router, tags=["Orders"])
app.include_router(chat_router, tags=["Chat"])






if __name__ == "__main__":
    uvicorn.run("rest_api.api:app", host="0.0.0.0", port=8000, reload=True, debug=True)