from fastapi import APIRouter, Depends, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from .. import crud
from ..main import get_db
import asyncio

import websockets



router = APIRouter()

@router.websocket("/ws/active_orders")
async def websocket_orders(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    try:
        while True:
            orders_data = await crud.get_active_orders(db)
            orders_jsonable = jsonable_encoder(orders_data)
            await websocket.send_json(orders_jsonable)
            await asyncio.sleep(1)
    except Exception as e:
        print(f"Error in websocket_orders: {e}")
    finally:
        await websocket.close(code=1000, reason="Closed normally")



