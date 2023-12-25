import "./CardModal.css";
import imageCard from '../../../assets/cards-img/card1.png';
import closeImg from '../../../assets/close.svg';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ProductInterface } from "./ProductCard";
import CartButton from '../CartButton/CartButton';

interface CardModalInterface {
    onClose: () => void;
    product: ProductInterface;
}

const CardModal: FC<CardModalInterface> = ({ onClose, product }) => {
    const modalRoot = document.getElementById('modal-root') || document.body;
    const modalContainer = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(modalContainer);
    
        return () => {
          modalRoot.removeChild(modalContainer);
        };
      }, [modalContainer, modalRoot]);


    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <img className="modal-close" src={closeImg} onClick={onClose}/>
                <img className="modal-preview" src={imageCard} />
                <div className="modal-content">
                    <span className="modal-name">{product.name}</span>
                    <span className="modal-description">{product.description}</span>
                    <div className='modal-info'>
                        <span className="modal-category">{product.category}</span>
                        <span className="modal-price">{product.price} ₽</span>
                    </div>
                    <CartButton productId={product.id} />
                </div>
            </div>
        </div>,
        modalContainer
    )
}

export default CardModal;