from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..main import get_db

router = APIRouter(prefix='/users')

@router.get("/{user_id}/cart", response_model=schemas.User)
async def get_user_cart(user_id: str, db: Session = Depends(get_db)):
    """ GET Метод для получения корзины по id"""

    cart = crud.get_user_cart(db, item_id=user_id)
        
    return cart

@router.post("/{user_id}/add-to-cart/{product_id}", response_model=schemas.User)
async def add_product_to_cart(user_id: str, product_id: int, db: Session = Depends(get_db)):
    """ POST Метод для добавления товара в корзину пользователя"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    product = crud.get_item(db, item_id=product_id, model=models.Products)
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    selected_product = db.query(models.SelectedProduct).filter_by(user_id=user_id, product_id=product_id).first()

    if selected_product:
        selected_product.quantity += 1
    else:
        selected_product = models.SelectedProduct(user_id=user_id, product_id=product_id, quantity=1)
        db.add(selected_product)

    db.commit()
    db.refresh(selected_product)
    
    return user

@router.delete("/{user_id}/remove-from-cart/{product_id}", response_model=schemas.User)
async def remove_product_from_cart(user_id: str, product_id: int, db: Session = Depends(get_db)):
    """ DELETE Метод для удаления товара из корзины пользователя"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    product = crud.get_item(db, item_id=product_id, model=models.Products)
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    selected_product = db.query(models.SelectedProduct).filter_by(user_id=user_id, product_id=product_id).first()

    if selected_product:
        if selected_product.quantity > 1:
            selected_product.quantity -= 1
        else:
            db.delete(selected_product)
    else:
        raise HTTPException(status_code=404, detail="Товар не найден в корзине")

    db.commit()
    
    return user

@router.delete("/{user_id}/clear-cart", response_model=schemas.User)
async def clear_cart(user_id: str, db: Session = Depends(get_db)):
    """DELETE Метод для удаления всех товаров из корзины пользователя"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    db.query(models.SelectedProduct).filter_by(user_id=user_id).delete()

    db.commit()

    return user