import ItemImage from "../core/ItemImage";
import "./Item.sass";

function Item({ item }) {
  const imageUrl = item.picture;
  const title = item.title;
  const height = 90;
  const width = 90;
  const price = item.price;
  const locale = item.locale;
  const formattedPrice = price.amount.toLocaleString(locale, {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: price.decimals,
  })
  const state = item.state;
  const freeShepping = item.free_shipping;

  let freeShipping = <div></div>
  if (freeShepping) {
    freeShipping = <div className="item-free-shipping" alt="Free Shipping"></div>
  }


  return (
    <div className="item-container">
      <div className="item">
        <ItemImage url={imageUrl} height={height} width={width} />
        <div className="item-description">
          <div className="item-price-container">
            <div className="item-price">{formattedPrice}</div>
            {freeShipping}
          </div>
          <span className="item-title">{title}</span>
        </div>
        <div className="item-state-container">
          <span className="item-state">{state}</span>
        </div>
      </div>
    </div>
  )
}

export default Item;