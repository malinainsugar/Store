import { FC } from 'react';
import axios from 'axios';

interface CompleteOrderButtonProps {
  orderId: number;
  onComplete: () => void;
}

const CompleteButton: FC<CompleteOrderButtonProps> = ({ orderId, onComplete }) => {
    const userId = '1';
    const handleComplete = async () => {
        try {
          await axios.put(`http://127.0.0.1:8000/users/${userId}/orders/${orderId}/complete`);
          onComplete();
        } catch (error) {
          console.error('Ошибка при завершении заказа:', error);
        }
      };

    return (
        <button className='complete-btn' onClick={handleComplete}>Завершить заказ</button>
    );
};


export default CompleteButton;