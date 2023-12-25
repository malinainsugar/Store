import { ProductCard, ProductInterface} from "./ProductCard";
import { FC } from 'react';

interface CategoryProps {
    categoryName: string;
    products: Array<ProductInterface>;
    searchQuery: string;
}

const Category: FC<CategoryProps> = ({categoryName, products, searchQuery}) => {
    return (
        <div className="category">
          <h3 className="category-name">{categoryName}</h3>
            <div className="cards-container">
              {products.map((product) => {
                if ((product.category == categoryName) && product.name.toLowerCase().includes(searchQuery.toLowerCase()) ) {
                  return <ProductCard key={product.id} product={product}/>
                }})}
            </div>
        </div>
    )
}

export default Category;