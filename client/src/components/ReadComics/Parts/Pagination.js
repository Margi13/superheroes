import { useEffect, useState } from 'react';
import * as imageService from '../../../services/imageService';
import PrevAndNext from './PrevAndNext';
import FirstAndLast from './FirstAndLast';
import '../ReadComics.css';

const Pagination = ({
    comicsId,
    urls,
    pageIndex,
    onChangePage
}) => {
    const [imagesUrl, setImagesUrl] = useState([]);
    useEffect(() => {
        if (urls) {
            imageService.getMultipleImagesFromFirebase(urls, `comics/${comicsId}`)
                .then(url => {
                    setImagesUrl(url);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, [urls, comicsId, setImagesUrl])

    const openNextPage = () => {
        if (imagesUrl.length - 1 === pageIndex) {
            onChangePage(imagesUrl.length - 1)
        } else {
            onChangePage(++pageIndex);
        }
    }
    const openPrevPage = () => {
        if (pageIndex === 0) {
            onChangePage(0)
        } else {
            onChangePage(--pageIndex);
        }
    }
    const goToFirstPage = () => {
        onChangePage(0);
    }
    const goToLastPage = () => {
        onChangePage(imagesUrl.length - 1);
    }
    return (
        <>
            <section className="pagination">
                <PrevAndNext
                    url={imagesUrl[pageIndex]}
                    onNext={openNextPage}
                    onPrev={openPrevPage}
                />
                <FirstAndLast
                    pageIndex={pageIndex}
                    totalPages={imagesUrl.length}
                    onFirst={goToFirstPage}
                    onLast={goToLastPage}
                />
            </section>
        </>
    );
}

export default Pagination;