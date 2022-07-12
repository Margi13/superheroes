import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as reportService from '../../services/reportService';
import './Reports.css'
import Table from '../Table/Table';
import { titles } from '../../common/messagesConstantsBG';

const Reports = () => {
    const navigate = useNavigate();
    const [toReload, setToReload] = useState(false);
    const [reports, setReports] = useState([]);

    const { user } = useAuthContext();
    useEffect(() => {
        reportService.getAllReports()
            .then(result => {
                result = result.sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn))
                setReports(result);
            })
        if (toReload === true) {
            setToReload(false);
        }
    }, [user._id, navigate, toReload]);

    return (
        <section className="admin-reports-page">
            <h1>{titles.Reports}</h1>
            <Table
                data={reports}
                pageSize={10}
                toReload={setToReload}
                columns={['Дата', 'Съобщение', 'За герой/комикс']}
                rows={'report'}
            >
            </Table>
        </section>
    )
}
export default Reports;