from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..main import get_db

router = APIRouter(prefix='/users')

@router.get("/", response_model=list[schemas.User])
async def read_users(db: Session = Depends(get_db)):
    """ GET Метод для получения всех пользователей"""

    users = crud.get_all_items(db, model=models.Users)
    return users

@router.get("/{user_id}", response_model=schemas.User)
async def read_user(user_id: str, db: Session = Depends(get_db)):
    """ GET Метод для получения пользователя по id"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if user is None:
        raise HTTPException(status_code=404, detail='Пользователь не найден')
    return user

@router.post("/create", response_model=schemas.User)
async def create_user(item: schemas.UserCreate, db: Session = Depends(get_db)):
    """ POST Метод для создания пользователя"""

    return crud.create_user(db=db, item=item)

@router.put("/{user_id}", response_model=schemas.User)
async def update_user(user_id: str, item: schemas.UserUpdate, db: Session = Depends(get_db)):
    """ PUT Метод для обновления пользователя по id"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if not user:
        raise HTTPException(status_code=400, detail='Пользователь не найден')
    return crud.update_user(db=db, item=item, user_id=user_id)

@router.delete("/{user_id}", response_model=str)
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    """ DELETE Метод для удаления пользователя по id"""

    user = crud.get_item(db, item_id=user_id, model=models.Users)
    if not user:
        raise HTTPException(status_code=400, detail='Пользователь не найден')
    crud.delete_item(db=db, item_id=user_id, model=models.Users)
    return 'Пользователь удален'