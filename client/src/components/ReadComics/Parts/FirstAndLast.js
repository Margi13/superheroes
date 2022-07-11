import { titles } from '../../../common/messagesConstantsBG';
import '../ReadComics.css';

const FirstAndLast = ({
    children,
    className,
    pageIndex,
    setPageIndex,
    totalPages
}) => {
    const currentPage = Number(pageIndex) + 1

    const onFirstClick = () => {
        setPageIndex(0);
    }
    const onLastClick = () => {
        if(totalPages <= 1) {
            setPageIndex(0);
        } else {
            setPageIndex(totalPages - 1);
        }
    }
    return (
        <>
            <section className={className}>
                <button className="first-button" onClick={onFirstClick}>
                    <h1>{"<<"}</h1>
                </button>
                    {children
                        ? children
                        : <div>{titles.Page}: {currentPage} / {totalPages || 1}</div>
                    }
                <button className="last-button" onClick={onLastClick}>
                    <h1>{">>"}</h1>
                </button>
            </section>
        </>
    );
}

export default FirstAndLast;