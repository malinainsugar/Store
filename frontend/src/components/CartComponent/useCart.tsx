import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface CartInterface {
    userId: string,
    productId: string 
}

const cartCacheKey = 'cart';

const fetchCartData = async (userId:string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/cart`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при получении данных о корзине');
    }
};


const addToCartRequest = async ({ userId, productId } : CartInterface) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/users/${userId}/add-to-cart/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при добавлении товара в корзину');
    }
};

const removeFromCartRequest = async ({ userId, productId } : CartInterface) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/users/${userId}/remove-from-cart/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при удалении товара из корзины');
    }
};

const clearCartRequest = async (userId: string) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/users/${userId}/clear-cart`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при очистке корзины');
  }
};


export const useCart = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: cartData } = useQuery([cartCacheKey, userId], () => fetchCartData(userId));

  const addToCartMutation = useMutation(addToCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries([cartCacheKey, userId]);
    },
  });

  const removeFromCartMutation = useMutation(removeFromCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries([cartCacheKey, userId]);
    },
  });

  const clearCartMutation = useMutation(clearCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries([cartCacheKey, userId]);
    },
  });

  const addToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({ userId, productId });
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await removeFromCartMutation.mutateAsync({ userId, productId });
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation.mutateAsync(userId);
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
    }
  };

  return { cartData, addToCart, removeFromCart, clearCart };
};
