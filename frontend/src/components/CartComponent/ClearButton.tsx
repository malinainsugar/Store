import { FC, useCallback } from 'react';
import { useCart } from './useCart';

interface ClearButtonProps {
  userId: string;
  onCartCleared: () => void;
}

const ClearButton: FC<ClearButtonProps> = ({ userId, onCartCleared }) => {
  const { clearCart } = useCart(userId);

  const handleClearClick = useCallback(async () => {
    try {
      await clearCart();
      console.log('Корзина очищена успешно');
      onCartCleared();
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
    }
  }, [clearCart, onCartCleared]);

  return (
    <button className='clear-btn' onClick={handleClearClick}>Очистить корзину</button>
  );
};

export default ClearButton;