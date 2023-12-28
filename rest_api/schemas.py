from pydantic import BaseModel
from typing import List
from datetime import datetime

#------------Товары-------------

class ProductBase(BaseModel):
    name: str
    price : int
    description : str 
    category : str

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int


#------------Корзина-------------


class SelectedProductBase(BaseModel):
    user_id: str
    product_id: int
    quantity: int = 1

class SelectedProductCreate(SelectedProductBase):
    pass

class SelectedProduct(SelectedProductBase):
    id: int


#------------Заказы-------------


class OrderProduct(BaseModel):
    product_id: int
    quantity: int

class OrderProductBase(BaseModel):
    order_id: int

class OrderBase(BaseModel):
    pass

class OrderCreate(OrderBase):
    order_products: List[OrderProduct]

class OrderUpdate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    date_time: datetime
    order_products: List[OrderProduct] = []
    user_id: str
    total_amount: int
    status: str


#------------Пользователи-------------


class UserBase(BaseModel):
    name: str
    avatar: str


class UserCreate(UserBase):
    id: str

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: str
    selected_products: List[SelectedProduct] = []
    orders: List[Order] = []