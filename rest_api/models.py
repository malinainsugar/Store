from sqlalchemy import  Integer, String, JSON, ForeignKey, Column, Table, DateTime
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from .database import Base

class Products(Base):
    __tablename__ = "products"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String)
    price = mapped_column(Integer)
    description = mapped_column(String)
    category = mapped_column(String)


class Users(Base):
    __tablename__ = "users"

    id = mapped_column(String, primary_key=True)
    name = mapped_column(String)
    avatar = mapped_column(String)

    selected_products = relationship("SelectedProduct", back_populates="user")
    orders = relationship("Orders", back_populates="user")


class SelectedProduct(Base):
    __tablename__ = "selected_products"

    id = mapped_column(Integer, primary_key=True)
    user_id = mapped_column(String, ForeignKey("users.id"))
    product_id = mapped_column(Integer, ForeignKey("products.id"))
    quantity = mapped_column(Integer, default=1)

    user = relationship("Users", back_populates="selected_products")
    product = relationship("Products")

class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    date_time = Column(DateTime(timezone=True), server_default=func.now())
    total_amount = Column(Integer)
    status = Column(String)

    user = relationship("Users", back_populates="orders")
    order_products = relationship("OrderProducts", back_populates="order", cascade="all, delete-orphan")

class OrderProducts(Base):
    __tablename__ = "order_products"

    order_id = Column(Integer, ForeignKey("orders.id"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    quantity = Column(Integer, default=1)

    order = relationship("Orders", back_populates="order_products")
    product = relationship("Products")

