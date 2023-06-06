import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { Table, message } from 'antd';
import { GetAllUsers } from '../../api/users';

function UsersList() {

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await GetAllUsers()
            dispatch(ShowLoader(false))
            if (response.sucess) {
                setUsers(response.data)
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
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render : (role) => role.toUpperCase()
        }
    ]

    return (
        <div>
            <Table columns={colums} dataSource={users} />
        </div>
    )
}

export default UsersList