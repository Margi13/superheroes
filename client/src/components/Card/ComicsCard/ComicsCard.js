import { Link } from 'react-router-dom';
import '../Card.css';
import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';

const ComicsCard = ({
    comics
}) => {
    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
        imageService.getImageFromFirebase(comics.imagesUrl[0])
            .then(url => {
                setImageUrl(url);
            });
    }, [comics.imagesUrl, setImageUrl])
    return (
        <div className="comics-card card">
            <Link to={"/details/comics/" + comics._id} href="/details/comics" className="btn card-details-btn">
            <div className="card-image-wrap">
                <img src={imageUrl} alt="" />
            
                <div className="comics-info">
                    <h3>{comics.title}</h3>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default ComicsCard;