function ProductItem(props) {
    const { id,title,price,image,addToBasket = Function.prototype } = props;

    return  <div className="card">
    <div className="card-image">
      <img src={image} alt={title} />
    </div>
    <div className="card-content">
      <span className= 'card-title'>{title}</span>
      
    </div>
    <div className="card-action">
           <button className='btn green darken-3' onClick={() => addToBasket({
             id,
             title,
             price
           })}>Buy</button>
           <span className='right'>${price}</span>
        </div>
  </div>
}

export {ProductItem}