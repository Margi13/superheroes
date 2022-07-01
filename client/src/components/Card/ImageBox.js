const ImageBox = ({
    imageUrl,
    altText,
    className
}) => {
    return (
        <img className={className} src={imageUrl || '/images/avatar-grooth.png'} alt={altText || ""} />
    )
}

export default ImageBox;