import { titles } from '../../../common/messagesConstantsBG';
import '../ReadComics.css';

const FirstAndLast = ({
    pageIndex,
    totalPages,
    onFirst,
    onLast
}) => {
    const currentPage = Number(pageIndex) + 1
    return (
        <>
            <section className="comics-footer">
                <button className="first-button" onClick={onFirst}>
                    <h1>{"<<"}</h1>
                </button>
                <div>
                    {titles.Page}: {currentPage} / {totalPages}
                </div>
                <button className="last-button" onClick={onLast}>
                    <h1>{">>"}</h1>
                </button>
            </section>
        </>
    );
}

export default FirstAndLast;