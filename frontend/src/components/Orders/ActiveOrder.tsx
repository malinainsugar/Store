import { FC, useState, useEffect } from 'react';
import Order from './Order'; 
import { OrderInterface } from './OrdersHistory';
import './Orders.css';
import CompleteButton from './CompleteButton'

const ActiveOrders: FC = () => {
    const userId = '1';
    const [orders, setOrders] = useState<OrderInterface[]>([]);
  
    useEffect(() => {
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${userId}/active_orders`);

      socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
      });

      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        // Обработка полученных данных (предположим, что сервер отправляет активные заказы)
        setOrders(data);
      });

      socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
      });

      socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });

      // Обычно нет необходимости отправлять сообщение на сервер, если сервер сам отправляет данные после подключения.

      return () => {
        socket.close();
      };
    }, [userId]);

    const completeOrder = async (orderId:number) => {
      try {
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status: 'Завершен' } : order
        );
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Ошибка при завершении заказа:', error);
      }
    };
  
    return (
      <div className='orders-history'>
        <ul className='orders-item-list'>
        {[...orders].reverse().map((order, index) => (
          <div key={index}>
            <Order order={order} />
            {order.status !== 'Завершен' && (
              <CompleteButton orderId={order.id} onComplete={() => completeOrder(order.id)} />
            )}
          </div>
        ))}
      </ul>
      </div>
    );
};
  
export default ActiveOrders;