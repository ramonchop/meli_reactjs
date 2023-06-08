function ItemImage({ url, height, width, alt }) {
    return (
        <div>
            <img src={url}  height={height} width={width} alt={alt} />
        </div>
    )
}

export default ItemImage