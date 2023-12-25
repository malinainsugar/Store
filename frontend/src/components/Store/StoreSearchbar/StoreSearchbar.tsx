import { FC, useEffect, useState } from "react";
import './StoreSearchbar.css'

const StoreSearchbar: FC<{passFunction:Function, filters:any, updateActiveFilters:Function }> = ({passFunction, filters, updateActiveFilters}:
    {passFunction:Function, filters:any, updateActiveFilters:Function}) =>{
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(()=>{
        passFunction(searchQuery)
    },[searchQuery])

    const handleSearch = (e:any) => {
        setSearchQuery(e.target.value);
    };

    function handleFilterClick(filter:string){
        let filterEl = document.getElementById(filter)
        
        filterEl?.classList.toggle('filter-button-active');
        
        updateActiveFilters(filterEl?.id)
    }


    return(
        <div className="store-searchbar-container">
            <form className="store-searchbar">
                <input 
                className="store-searchbar-input" 
                type="text"
                value={searchQuery}
                placeholder="Введите название товара..."
                onInput={handleSearch} />
                <button className="store-form-button"></button>
            </form>
            <div className="searchbar-filters">
                {filters.map((filter:any, index:any)=>(
                    <button className="filter-button" 
                    key={index} 
                    id={filter} 
                    onClick={()=> handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default StoreSearchbar