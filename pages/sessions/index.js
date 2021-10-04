import React from 'react';
import styles from './sessions.module.scss';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { getStations } from '../../api/requests';
import Error from "../../components/Error/Error";

export const getStaticProps = async () => {
    const data = await getStations();

    return {
        props: { data }
    }
}

function Session({ data }) {

    if (!data.success) {
        return <Error />
    }

    const columns = [
        {
            title: 'EVSE ID',
            dataIndex: '_id',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a._id.localeCompare(b._id)
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '20%',
        },
        {
            title: 'Finished At',
            dataIndex: 'finishedAt',
            width: '20%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.address.localeCompare(b.address)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.status.localeCompare(b.status)
        }
    ]

    const tableData = data.data?.stations?.map((dataItem, index) => {
        const { _id, lastUpdated, address, status } = dataItem;

        return {
            key: `${index}`,
            _id,
            date: lastUpdated,
            finishedAt: lastUpdated,
            address,
            status
        }
    });

    return (
        <section className={styles.container}>
            <span className={styles.title}>Sessions</span>
            <div>
                <Table columns={columns} dataSource={tableData}/>
            </div>
        </section>
    );
}

export default Session;
