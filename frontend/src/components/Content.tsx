import {FC} from 'react';
import './Main.css';
import Store from './Store/Store';
import CartComponent from './CartComponent/CartComponent'
import OrderHistory from './Orders/OrdersHistory';
import Info from './Info';


interface ContentProps {
  activeButton: string;
}

const Content: FC<ContentProps> = ({ activeButton }) => {
  switch (activeButton) {
    case 'products':
      return <Store/>;
    case 'cart':
      return <CartComponent/>;
    case 'orderHistory':
      return <OrderHistory/>;
    case 'main':
      return <Info/>;
    default:
      return <Store/>;
  }
};

export default Content;
