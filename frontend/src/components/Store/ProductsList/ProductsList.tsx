import { useEffect, useState, FC } from "react";
import Category from "./Category";
import { ProductInterface } from './ProductCard';
import axios from 'axios';


interface ProductsListProps {
  searchQuery:string;
  categoriesList:Array<string>;
  activeFilters:Array<string>;
}

const ProductsList: FC<ProductsListProps> = ({ searchQuery, categoriesList, activeFilters }) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<ProductInterface>>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        
        setIsLoaded(true);
        setProducts(response.data);
      } catch (error: unknown) {
        setIsLoaded(true);
        if (error instanceof Error) {
          setError(error);
        } else {
          console.error('Произошла неизвестная ошибка:', error);
        }
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div className='answ'>Ошибка: ${error.message}</div>;
  } else if (!isLoaded) {
    return <div className='answ'>Загрузка...</div>;
  } else {
    return (
      <div className='categories-container'>
        {categoriesList.map(category => {
          if (activeFilters.length === 0 || activeFilters.includes(category)) {
            return (
              <Category
                key={category}
                categoryName={category}
                searchQuery={searchQuery}
                products={products}
              />
            );
          }
        })}
      </div>
    );
  }
};

export default ProductsList;