import '../ReadComics.css';
import '../../Reports/Reports.css';

const PrevAndNext = ({
    children,
    pageIndex,
    pageSize,
    setPageIndex,
    totalItems,
    className
}) => {
    const openNextPage = () => {
        if (totalItems === (pageSize * (pageIndex + 1))) {
            setPageIndex(pageIndex);
        } else {
            setPageIndex(pageIndex + 1);
        }
    }
    const openPrevPage = () => {
        if (pageIndex === 0) {
            setPageIndex(0)
        } else {
            setPageIndex(pageIndex - 1);
        }
    }
    return (
        <section className={className}>
            <button className="prev-button" onClick={openPrevPage}>
                <i className="fa fa-regular fa-chevron-left"></i>
            </button>
            {children ? children : ''}
            <button className="next-button" onClick={openNextPage}>
                <i className="fa fa-regular fa-chevron-right"></i>
            </button>
        </section>
    );
}

export default PrevAndNext;