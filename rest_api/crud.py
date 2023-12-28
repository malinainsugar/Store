from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from typing import List
from datetime import datetime


from . import models, schemas


def get_all_items(db: Session, model):
    """Метод для получения всех элементов"""

    return db.query(model).all()

def get_item(db: Session, item_id, model):
    """Метод для получения элемента по id"""

    return db.query(model).filter(model.id == item_id).first()

def create_product(db: Session, item: schemas.ProductCreate):
    """Метод для добавления товара в базу"""

    db_product = models.Products(
        name = item.name,
        price = item.price,
        description = item.description,
        category = item.category
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, item: schemas.ProductUpdate, product_id: int):
    """Метод для обновления товара в базе"""

    db_item = get_item(db, item_id=product_id,  model=models.Products)
    db_item.name = item.name
    db_item.price = item.price
    db_item.description = item.description
    db_item.category = item.category
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id, model):
    """Метод для удаления элемента"""

    db_item = get_item(db, item_id=item_id, model=model)
    db.delete(db_item)
    db.commit()






def create_user(db: Session, item: schemas.UserCreate):
    """Метод для добавления пользователя в базу"""

    db_user = models.Users(
        id = item.id,
        name = item.name,
        avatar = item.avatar
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, item: schemas.UserUpdate, user_id):
    """Метод для обновления пользователя в базе"""

    db_user = get_item(db, item_id=user_id, model=models.Users)
    db_user.name = item.name
    db_user.avatar = item.avatar
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_cart(db: Session, item_id):
    """Метод для получения корзины пользователя по его id"""

    user = db.query(models.Users).filter(models.Users.id == item_id).first()

    if not user:
        return None

    cart_items = db.query(models.SelectedProduct).filter_by(user_id=item_id).all()

    cart = [
        {
            "product_id": cart_item.product_id,
            "quantity": cart_item.quantity,
            "product": {
                "id": cart_item.product.id,
                "name": cart_item.product.name,
                "price": cart_item.product.price,
                "description": cart_item.product.description,
                "category": cart_item.product.category
            }
        } for cart_item in cart_items
    ]

    return JSONResponse(cart)


async def get_active_orders(db: Session):
    """Метод для получения активных заказов о продуктах"""

    orders = db.query(models.Orders).filter(models.Orders.status != 'Завершен').all()

    result_orders = []

    for order in orders:
        order_dict = {
            "id": order.id,
            "date_time": order.date_time.strftime("%H:%M %d.%m.%Y"),
            "user_id": order.user_id,
            "status": order.status,
            "total_amount": order.total_amount,
            "order_products": []
        }

        for order_product in order.order_products:
            product = db.query(models.Products).get(order_product.product_id)
            if product:
                order_dict["order_products"].append({
                    "product_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": order_product.quantity,
                    "category": product.category
                })

        result_orders.append(order_dict)

    return result_orders


def get_all_orders_by_user(db: Session, user_id, isActives=False):
    """Метод для получения всех заказов пользователя с дополнительной информацией о продуктах"""

    query = db.query(models.Orders).filter(models.Orders.user_id == user_id)

    if isActives:
        query = query.filter(models.Orders.status != 'Завершен')

    orders = query.all()

    result_orders = []

    for order in orders:
        order_dict = {
            "id": order.id,
            "date_time": order.date_time.strftime("%H:%M %d.%m.%Y"),
            "user_id": order.user_id,
            "status": order.status,
            "total_amount": order.total_amount,
            "order_products": []
        }

        for order_product in order.order_products:
            product = db.query(models.Products).get(order_product.product_id)
            if product:
                order_dict["order_products"].append({
                    "product_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": order_product.quantity,
                    "category": product.category
                })

        result_orders.append(order_dict)

    return JSONResponse(result_orders)


def create_order(db: Session, user_id, order_data: schemas.OrderCreate):
    """Метод для создания заказа"""

    total_amount = 0
    db_order_products = []

    for order_product_data in order_data.order_products:
        product = db.query(models.Products).get(order_product_data.product_id)
        if product:
            total_amount += product.price * order_product_data.quantity
            order_product = models.OrderProducts(
                product_id=order_product_data.product_id,
                quantity=order_product_data.quantity
            )
            db_order_products.append(order_product)

    db_order = models.Orders(
        user_id=user_id,
        total_amount=total_amount,
        order_products=db_order_products,
        status="Активен"
    )

    db.add(db_order)
    db.query(models.SelectedProduct).filter_by(user_id=user_id).delete()
    db.commit()
    db.refresh(db_order)

    return db_order

def complete_order(db: Session, order_id: int):
    """Метод для завершения заказа"""

    order =  db.query(models.Orders).filter(models.Orders.id == order_id).first()
    if order:
        order.status = "Завершен"
        db.commit()
        db.refresh(order)
    return order
