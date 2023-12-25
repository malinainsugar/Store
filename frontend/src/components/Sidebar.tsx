import { FC } from 'react';
import './Main.css';

interface SidebarProps {
  activeButton: string;
  onButtonClick: (buttonName: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeButton, onButtonClick }) => {
  const buttons = [
    { id: 'main', label: 'Главная' },
    { id: 'products', label: 'Товары' },
    { id: 'cart', label: 'Корзина' },
    { id: 'orderHistory', label: 'История заказов' },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {buttons.map((button) => (
          <li key={button.id}>
            <button
              onClick={() => onButtonClick(button.id)}
              className={activeButton === button.id ? 'active sidebar-list-item' : 'sidebar-list-item'}>
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;