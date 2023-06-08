import ItemImage from '../core/ItemImage'
import PriceBox from './PriceBox'
import './Detail.sass'
import Description from './Description'


function Detail({ item }) {
    const url = item.picture
    const description = item.description;
    return (
        <div className="item-detail-container">
            <div className='left-section'>
                <ItemImage url={url} />
                <Description description={description} />
            </div>
            <div className='right-section'>
                <PriceBox item={item} />
            </div>
        </div>
    )
}

export default Detail