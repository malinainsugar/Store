from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..main import get_db

router = APIRouter(prefix='/products')

@router.get("", response_model=list[schemas.Product])
async def read_products(db: Session = Depends(get_db)):
    """ GET Метод для получения всех товаров"""

    products = crud.get_all_items(db, model=models.Products)
    return products

@router.get("/{product_id}", response_model=schemas.Product)
async def read_product(product_id: int, db: Session = Depends(get_db)):
    """ GET Метод для получения товара по id"""

    product = crud.get_item(db, item_id=product_id, model=models.Products)
    if product is None:
        raise HTTPException(status_code=404, detail='Элемент не найден')
    print(type(product))
    return product

@router.post("/create", response_model=schemas.Product)
async def create_product(item: schemas.ProductCreate, db: Session = Depends(get_db)):
    """ POST Метод для создания товара"""

    return crud.create_product(db=db, item=item)

@router.put("/{product_id}", response_model=schemas.Product)
async def update_product(product_id: int, item: schemas.ProductUpdate, db: Session = Depends(get_db)):
    """ PUT Метод для обновления товара по id"""

    product = crud.get_item(db, item_id=product_id, model=models.Products)
    if not product:
        raise HTTPException(status_code=400, detail='Элемент не найден')
    return crud.update_product(db=db, item=item, product_id=product_id)

@router.delete("/{product_id}", response_model=str)
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    """ DELETE Метод для удаления товара по id"""

    product = crud.get_item(db, item_id=product_id, model=models.Products)
    if not product:
        raise HTTPException(status_code=400, detail='Элемент не найден')
    crud.delete_item(db=db, item_id=product_id, model=models.Products)
    return 'Элемент удален'