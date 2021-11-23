import {useState,useEffect} from 'react';
import {Preloader} from './Preloader';
import {ProductList} from './ProductList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Search} from './Search';


function Shop() {
    const [filteredProducts,setFilteredProducts] = useState([]);
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [order,setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    
    
    useEffect (()=>{
        fetch('https://fakestoreapi.com/products/')
               .then(res=>res.json())
               .then(json=> setProducts(json))
               setLoading(false)
                  
       }, []);
       
       useEffect (()=>{
        fetch('https://fakestoreapi.com/products/')
               .then(res=>res.json())
               .then(json=> setFilteredProducts(json))
               setLoading(false)
                  
       }, []);
       
   

    const handleSearch = (str) => {
        setFilteredProducts (
            products.filter(item =>
           item.title &&  item.title.toLowerCase().includes(str.toLowerCase()))
        )
    }


    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)
        
        if (itemIndex < 0) {
            
            const newItem = {
                ...item,
                quantity:1,
            }
                setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                } else {
                    return orderItem;
                }
            })

            setOrder(newOrder);
        }
    }

    const removeFromBasket = (itemId) => {
            const newOrder = order.filter((el) => el.id !== itemId)
            setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map (el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity 
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }
    const decQuantity = (itemId) => {
        const newOrder = order.map (el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

   
  
    return <main className = 'container-content'>
        
        <Search cb={handleSearch}/>
        
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket}/> 
        {  
        }
       {  loading ? <Preloader/> : <ProductList products={filteredProducts}  addToBasket={addToBasket}  /> 
        }
        
        {
            isBasketShow && <BasketList 
            order={order} 
            handleBasketShow={handleBasketShow} 
            removeFromBasket={removeFromBasket}
            incQuantity={incQuantity}
            decQuantity={decQuantity}
            />
        }
    </main>;
}

export { Shop };