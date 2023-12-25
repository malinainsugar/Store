import { FC } from 'react';
import CartButton from '../Store/CartButton/CartButton';
import { CartItemInterface } from '../Store/CartButton/CartButton';
import imageCard from '../../assets/cards-img/card1.png';

interface CartItemProps {
  cartItem: CartItemInterface;
  onQuantityChange: (productId: number, newQuantity: number) => void;
}

const CartItem: FC<CartItemProps> = ({ cartItem, onQuantityChange }) => {
    return (
        <li className="cart-item" key={cartItem.product.id}>
            <div className="cart-item-card">
                <img className="cart-item-preview" src={imageCard} alt={cartItem.product.name} />
                <div className="cart-item-info">
                    <span>{cartItem.product.name}</span>
                    <span>{cartItem.quantity} шт.</span>
                    <span>{cartItem.product.price * cartItem.quantity} ₽</span>
                </div>
            </div>
            <CartButton productId={cartItem.product.id} inCard={cartItem} onQuantityChange={onQuantityChange} />
        </li>
    );
};

export default CartItem;