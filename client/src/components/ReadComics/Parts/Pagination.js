import { useEffect, useState } from 'react';
import * as firebaseService from '../../../services/firebaseService';
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
            firebaseService.getMultipleImagesFromFirebase(urls, `comics/${comicsId}`)
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
    return (
        <>
            <section className="pagination">
                <PrevAndNext className="comics-pn"
                    onNext={openNextPage}
                    onPrev={openPrevPage}
                    setPageIndex={onChangePage}
                    pageIndex={pageIndex}
                    pageSize={1}
                    totalItems={imagesUrl.length}
                >
                    <img src={imagesUrl[pageIndex]} alt="Comics Page" />
                </PrevAndNext>
                <FirstAndLast className="comics-footer"
                    pageIndex={pageIndex}
                    setPageIndex={onChangePage}
                    totalPages={imagesUrl.length}
                />
            </section>
        </>
    );
}

export default Pagination;