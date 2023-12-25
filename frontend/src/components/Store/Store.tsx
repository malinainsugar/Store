import "./Store.css";
import { useState } from 'react';

import ProductsList from "./ProductsList/ProductsList";
import StoreSearchbar from './StoreSearchbar/StoreSearchbar';


function Store () {
    const [searchQuery, setSearchQuery] = useState('');
    const categoriesList = ["Привилегии", "Чертежи", "Ресурсы", "Одежда", "Прочее"];
    const [activeFilters, setActiveFilters] = useState<Array<string>>([]);

    function setSearch(query:string){
        setSearchQuery(query);
    }

    function updateActiveFilters(filter:string) {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter((category => category !== filter)))
            return;
          }
        setActiveFilters((filters) => [...filters, filter]);
    }

    return (
        <section id="store" className="store-section">
            <StoreSearchbar passFunction={setSearch} filters={categoriesList} updateActiveFilters={updateActiveFilters}/>
            <ProductsList searchQuery={searchQuery} categoriesList={categoriesList} activeFilters={activeFilters}/>
        </section>
    )
}

export default Store