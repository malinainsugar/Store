import { useEffect, useState, FC } from 'react';
import { ProductInterface } from '../Store/ProductsList/ProductCard';
import Order from './Order';
import './Orders.css';
import axios from 'axios';

interface OrderInterface {
  id: number;
  user_id: number;
  total_amount: number;
  date_time: string;
  order_products: Array<ProductInterface>;
  status: string;
}


const OrderHistory: FC = () => {
  const userId = '1';
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при получении заказов:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className='orders-history'>
      <ul className='orders-item-list'>
        {[...orders].reverse().map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
export type {OrderInterface};