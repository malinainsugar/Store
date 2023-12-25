import { FC, useEffect, useState} from 'react';
import { ProductInterface } from '../ProductsList/ProductCard';
import "./CartButton.css";
import { useCart } from '../../CartComponent/useCart';

interface CartButtonInterface {
    productId: number;
    onQuantityChange?: (productId: number, newQuantity: number) => void;
}

interface CartInterface {
    userId: number;
    products: Array<CartItemInterface>;
}
  
interface CartItemInterface {
    product_id: number;
    quantity: number;
    product: ProductInterface;
}

const CartButton: FC<CartButtonInterface> = ({ productId, onQuantityChange }) => {
  const userId = '1';
  const { addToCart, removeFromCart, cartData } = useCart(userId);

  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    if (!cartData) return;

    const cartItem = cartData.find((item) => item.product_id === productId);

    if (cartItem && quantityInCart !== cartItem.quantity) {
      setQuantityInCart(prevQuantity => {
        onQuantityChange?.(productId, cartItem.quantity);
        return cartItem.quantity;
      });
    } else if (!cartItem && quantityInCart !== 0) {
      setQuantityInCart(prevQuantity => {
        onQuantityChange?.(productId, 0);
        return 0;
      });
    }
  }, [cartData, onQuantityChange, productId, userId, quantityInCart]);

  const onAddToCart = () => {
    addToCart(productId);
  };

  const onRemoveFromCart = () => {
    removeFromCart(productId);
  };

  return (
    <>
      {quantityInCart > 0 ? (
        <div className="cart-quantity">
          <button type="button" className="cart-quantity-btn" onClick={onRemoveFromCart}>
            -
          </button>
          <span className="cart-quantity-value">{quantityInCart}</span>
          <button type="button" className="cart-quantity-btn" onClick={onAddToCart}>
            +
          </button>
        </div>
      ) : (
        <button type="button" className="card-btn" onClick={onAddToCart}>
          В корзину
        </button>
      )}
    </>
  );
};

  
export default CartButton;
export type { CartInterface, CartItemInterface };
  