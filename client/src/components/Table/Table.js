
import { useEffect, useState } from 'react';
import PrevAndNext from '../ReadComics/Parts/PrevAndNext';
import '../Reports/Reports.css'
import ReportRow from './ReportRow';
const Table = ({
    children,
    data,
    pageIndex,
    pageSize,
    onChangePage,
    toReload
}) => {
    const [pagedData, setPagedData] = useState([]);

    useEffect(() => {
        const paged = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedData(paged);
    }, [setPagedData, data, pageIndex, pageSize])

    const openNextPage = () => {
        const lastPage = Math.ceil(data.length / pageSize) - 1
        if (pageIndex === lastPage) {
            onChangePage(lastPage)
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
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Съобщение</th>
                        <th>За комикс</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {pagedData && pagedData.length > 0
                        ? pagedData.map(r => <ReportRow key={r._id} data={r} toReload={toReload}/>)
                        : <></>
                    }
                </tbody>
            </table>
            <PrevAndNext className="table-pagination"
                onNext={openNextPage}
                onPrev={openPrevPage}
            >
                {children}
            </PrevAndNext>
        </>
    )
}
export default Table;