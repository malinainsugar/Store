import { FC } from 'react';
import { OrderInterface } from './OrdersHistory';
import imageCard from '../../assets/cards-img/card1.png';

  
interface OrderProps {
    order: OrderInterface;
}


const Order: FC<OrderProps> = ({ order }) => {
  
    return (
      <li className="order" key={order.id}>
      <div className="order-header">
        <h3>Заказ #{order.id}</h3>
        <div className={`order-status ${order.status === 'Активен' ? 'active' : 'completed'}`}>
          {order.status}
        </div>
      </div>
      <p>Дата и время: {order.date_time}</p>
      <p>Сумма заказа: {order.total_amount} ₽</p>
        
        <h4>Товары в заказе:</h4>
        <div className='order-product-list'>
          {order.order_products.map((product, index) => (
            <div key={index} className="order-product-card">
              <img className="order-preview" src={imageCard} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price} ₽</p>
              <p>Количество: {product.quantity}</p>
              <p>{product.category}</p>
            </div>
          ))}
        </div>
      </li>
    );
};
  
export default Order;