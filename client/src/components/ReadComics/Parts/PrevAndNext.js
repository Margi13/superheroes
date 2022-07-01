import '../ReadComics.css';

const PrevAndNext = ({
    children,
    onNext,
    onPrev,
    className
}) => {

    return (
        <section className={className}>
            <button className="prev-button" onClick={onPrev}>
                <i className="fa fa-regular fa-chevron-left"></i>
            </button>
            {children}
            <button className="next-button" onClick={onNext}>
                <i className="fa fa-regular fa-chevron-right"></i>
            </button>
        </section>
    );
}

export default PrevAndNext;