import './PriceBox.sass'

function PriceBox({ item }) {
    const title = item.title
    const condition = item.condition
    const soldQuantity = item.sold_quantity


    const locale = item.locale
    const price = item.price
    const decimals = price.decimals
    const currency = price.currency

    const formattedPrice = price.amount.toLocaleString(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
      })

    const indexToCut = formattedPrice.length - decimals;

    const integerPart = formattedPrice.substring(0, indexToCut-1)

    const decimalPart = formattedPrice.substring(indexToCut)

    const sellAndCondition = `${condition} - ${soldQuantity} vendidos`

    return (
        <div className="price-box-container">
            <div className='price-box-top-section'>
               <span className="sell-condition">{sellAndCondition}</span>
            </div>
            <span className="price-box-title">{title}</span>
            <div className="price-box-price">
                <span className='price-box-integer'>{integerPart}</span>
                <span className='price-box-decimal'>{decimalPart}</span>
            </div>
                <button className='price-box-buy-button'>Comprar</button>
        </div>
    )
}

export default PriceBox