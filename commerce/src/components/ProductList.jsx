import {ProductItem} from './ProductItem'

function ProductList(props) {
    const {products = [], addToBasket = Function.prototype } = props;

    if (!products.length) {
       return <h3>Nothing here</h3>
    }
    return <div className="products">
        {products.map(item => (
            <ProductItem key={item.id} {...item} addToBasket={addToBasket}/>
        ))}
    </div>
}

export {ProductList}