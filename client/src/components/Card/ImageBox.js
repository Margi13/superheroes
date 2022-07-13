const ImageBox = ({
    imageUrl,
    altText,
    className
}) => {
    return (
        <img className={`${className} disable-rc`} src={imageUrl || '/images/avatar-grooth.png'} alt={altText || ""} />
    )
}

export default ImageBox;