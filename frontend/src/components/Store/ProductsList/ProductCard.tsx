import imageCard from '../../../assets/cards-img/card1.png';
import { FC, useState } from 'react';
import CardModal from './CardModal';
import CartButton from '../CartButton/CartButton';

interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
}

interface ProductCardProps {
  product: ProductInterface;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="card">
      <div className="card-content" onClick={openModal}>
        <img className="card-preview" src={imageCard} alt={product.name} />
        <div className="card-info">
          <span className="card-name">{product.name}</span>
          <span className="card-price">{product.price} ₽</span>
        </div>
      </div>
      <CartButton productId={product.id} />
    </div>

    {isModalOpen && <CardModal onClose={closeModal} product={product}/>}
    </>
  );
}

export { ProductCard };
export type { ProductInterface };
