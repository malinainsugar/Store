import { FC } from 'react';
import { CartItemInterface } from '../../../Store/CartButton/CartButton';
import axios from 'axios';

interface BuyButtonProps {
  userId: number;
  cartItems: Array<CartItemInterface>;
  onCartCleared: () => void;
}

const BuyButton: FC<BuyButtonProps> = ({ userId, cartItems, onCartCleared }) => {
  const handleBuyClick = () => {
    const orderProducts = cartItems.map((cartItem) => ({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity,
    }));

    const orderData = {
      order_products: orderProducts,
    };

    axios.post(`http://127.0.0.1:8000/users/${userId}/orders/create`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Заказ создан успешно:', response.data);
        onCartCleared();
      })
      .catch((error) => {
        console.error('Ошибка при создании заказа:', error);
      });
  };

  return (
    <button className='buy-btn' onClick={handleBuyClick}>Купить</button>
  );
};

export default BuyButton;
