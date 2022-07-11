import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as adminService from '../../services/adminService';
import * as reportService from '../../services/reportService';
import './Reports.css'
import Table from '../Table/Table';

const Reports = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [toReload, setToReload] = useState(false);
    const [reports, setReports] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const { user } = useAuthContext();
    useEffect(() => {
        adminService.getAdminId()
            .then(result => {
                if (result.adminId === user._id) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                    navigate('/');
                }
            });
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
            <h1>Сигнализирани комикси</h1>
            <Table
                data={reports}
                pageIndex={pageIndex}
                pageSize={10}
                onChangePage={setPageIndex}
                toReload={setToReload}
            >
                <span>Страница {pageIndex + 1}/{Math.ceil(reports.length / 10) || 1}</span>
            </Table>
        </section>
    )
}
export default Reports;