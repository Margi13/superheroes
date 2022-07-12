import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import '../../Reports/Reports.css'
import Table from '../../Table/Table';
import { titles } from '../../../common/messagesConstantsBG';
import { useMyDocumentsState } from '../../../hooks/useDocumentState';

const MyDocuments = () => {
    const { user } = useAuthContext();
    const [toReload, setToReload] = useState(false);
    const [documents] = useMyDocumentsState(user._id);

    useEffect(() => {
        if (toReload === true) {
            setToReload(false);
        }
    }, [toReload]);

    return (
        <section className="admin-reports-page my-page">
            <h1>{titles.MyDocuments}</h1>
            <Table
                data={documents}
                pageSize={10}
                toReload={setToReload}
                columns={['Дата на създаване', 'Дата на публикуване', 'Тип','За', 'Име']}
                rows={'document'}
            >
            </Table>
        </section>
    )
}
export default MyDocuments;