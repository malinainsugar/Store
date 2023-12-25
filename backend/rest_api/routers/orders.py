from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..main import get_db
from typing import List
from fastapi.encoders import jsonable_encoder
import websockets

router = APIRouter(prefix='/users')

@router.get("/{user_id}/orders", response_model=list[schemas.Order])
async def read_orders(user_id: str, db: Session = Depends(get_db)):
    """GET метод для получения всех заказов пользователя"""

    orders = crud.get_all_orders_by_user(db, user_id=user_id, isActives=False)
    return orders

@router.get("/{user_id}/orders/{order_id}", response_model=schemas.Order)
async def read_order(order_id: int, db: Session = Depends(get_db)):
    """ GET Метод для получения заказа по id"""

    order = crud.get_item(db, item_id=order_id, model=models.Orders)
    if order is None:
        raise HTTPException(status_code=404, detail='Заказ не найден')
    return order

@router.get("/{user_id}/active_orders", response_model=List[schemas.Order])
async def read_active_orders(user_id: str, db: Session = Depends(get_db)):
    """GET метод для получения списка активных заказов пользователя"""

    active_orders = crud.get_all_orders_by_user(db, user_id=user_id, isActives=True)
    return active_orders


@router.post("/{user_id}/orders/create", response_model=schemas.Order)
async def create_order(user_id: str, order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    """POST Метод для создания заказа"""

    order = crud.create_order(db, user_id, order_data)
    return order

@router.put("/{user_id}/orders/{order_id}/complete", response_model=schemas.Order)
async def complete_order(user_id: str, order_id: int, db: Session = Depends(get_db)):
    """ PUT Метод для завершения заказа """

    order = crud.get_item(db, item_id=order_id, model=models.Orders)

    if order is None or order.user_id != user_id or order.status == "Завершен":
        raise HTTPException(status_code=404, detail='Заказ не найден или уже завершен')

    return crud.complete_order(db, order_id=order_id)


@router.delete("/{user_id}/orders/{order_id}", response_model=str)
async def delete_order(order_id: int, db: Session = Depends(get_db)):
    """ DELETE Метод для удаления заказа по id"""

    order = crud.get_item(db, item_id=order_id, model=models.Orders)
    if not order:
        raise HTTPException(status_code=400, detail='Заказ не найден')
    crud.delete_item(db=db, item_id=order_id, model=models.Orders)
    return 'Заказ удален'

