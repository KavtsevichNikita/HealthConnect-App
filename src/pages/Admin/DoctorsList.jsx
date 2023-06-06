import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { GetAllDoctors, UpdateDoctor } from '../../api/doctors';
import { Table, message } from 'antd';

function DoctorsList() {

    const [doctors, setDoctors] = useState([]);

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await GetAllDoctors()
            dispatch(ShowLoader(false))
            if (response.sucess) {
                setDoctors(response.data)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(ShowLoader(false))
            message.error(error.message)

        }
    }

    const changeStatus = async (payload) => {
        try {
            dispatch(ShowLoader(true))
            const response = await UpdateDoctor(payload)
            dispatch(ShowLoader(false))
            if (response.sucess) {
                message.success(response.message)
                getData();
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(ShowLoader(false))
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const colums = [
        {
            title: 'First Name',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Speciality',
            dataIndex: 'speciality'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => {
                return text.toUpperCase()
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                if (record.status === 'pending') {
                    return (
                        <div className="flex gap-1">
                            <span className='underline pointer'
                                onClick={() => changeStatus({
                                    ...record,
                                    status: 'rejected'

                                })}>Reject</span>
                            <span className='underline pointer'
                                onClick={() => changeStatus({
                                    ...record,
                                    status: 'approved'

                                })}>Approve</span>
                        </div>
                    )
                }

                if (record.status === 'approved') {
                    return (
                        <div className="flex gap-1">
                            <span className='underline pointer'
                                onClick={() => changeStatus({
                                    ...record,
                                    status: 'blocked'

                                })}>Block</span>
                        </div>
                    )
                }

                if (record.status === 'blocked') {
                    return (
                        <div className="flex gap-1">
                            <span className='underline pointer'
                                onClick={() => changeStatus({
                                    ...record,
                                    status: 'approved'

                                })}>Unblock</span>
                        </div>
                    )
                }
            }
        }
    ]

    return (
        <div>
            <Table columns={colums} dataSource={doctors} />
        </div>
    )
}

export default DoctorsList