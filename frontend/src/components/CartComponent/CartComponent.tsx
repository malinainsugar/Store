import { useEffect, useState, FC } from 'react';
import { CartItemInterface } from '../Store/CartButton/CartButton';
import "./CartComponent.css"
import BuyButton from './BuyButton';
import ClearButton from './ClearButton';
import CartItem from './CartItem';
import { useCart } from './useCart';



const CartComponent: FC = () => {
  const userId = '1';
  const [cartItems, setCartItems] = useState<Array<CartItemInterface>>([]);
  const { cartData } = useCart(userId);
  
  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  const handleCartCleared = () => {
    setCartItems([]);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

    setCartItems(updatedCartItems);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className='cart-container'>
      <ul className='cart-items-list'>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.product.id} cartItem={cartItem} onQuantityChange={handleQuantityChange} />
          ))
        ) : (
          <p className="cart-empty">Корзина пуста</p>
        )}
      </ul>
      <div className='bottom-panel'>
        <p className='total-amount'>Общая сумма: {totalAmount} руб.</p>
        <div className='btns-container'>
          <ClearButton userId={userId} onCartCleared={handleCartCleared} />
          <BuyButton userId={userId} cartItems={cartItems} onCartCleared={handleCartCleared} />
        </div>
      </div>
    </div>
  );
};

export default CartComponent;