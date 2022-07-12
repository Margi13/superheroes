
import { useEffect, useState } from 'react';
import PrevAndNext from '../ReadComics/Parts/PrevAndNext';
import { titles } from '../../common/messagesConstantsBG';
import '../Reports/Reports.css'
import DocumentRow from './DocumentRow';
import ReportRow from './ReportRow';
const Table = ({
    children,
    data,
    pageSize,
    toReload,
    columns,
    rows
}) => {
    const [pagedData, setPagedData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const paged = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        setPagedData(paged);
    }, [setPagedData, data, pageIndex, pageSize])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>{columns[0]}</th>
                        <th>{columns[1]}</th>
                        <th>{columns[2]}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rows === 'report'
                            ? (pagedData && pagedData.length > 0
                                ? pagedData.map(r => <ReportRow key={r._id} data={r} toReload={toReload} />)
                                : <></>)
                            : (pagedData && pagedData.length > 0
                                ? pagedData.map(d => <DocumentRow key={d._id} data={d} toReload={toReload} />)
                                : <></>)
                    }
                </tbody>
            </table>
            <PrevAndNext className="table-pagination"
                setPageIndex={setPageIndex}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalItems={data.length}
            >
                <span>{titles.Page} {pageIndex + 1}/{Math.ceil(data.length / pageSize) || 1}</span>
            
            </PrevAndNext>
        </>
    )
}
export default Table;