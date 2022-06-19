import '../ReadComics.css';

const PrevAndNext = ({
    onNext,
    onPrev,
    url
}) => {

    return (
        <section className="comics-view">
            <button className="prev-button" onClick={onPrev}>
                <i className="fa fa-regular fa-chevron-left"></i>
            </button>
            <img src={url} alt="Comics Page" />
            <button className="next-button" onClick={onNext}>
                <i className="fa fa-regular fa-chevron-right"></i>
            </button>
        </section>
    );
}

export default PrevAndNext;