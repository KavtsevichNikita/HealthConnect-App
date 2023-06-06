import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice'
import { GetDoctorById } from '../../api/doctors'

function Booking() {

    const [doctor, setDoctor] = useState(null)
    const { id } = useParams()
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await GetDoctorById(id)
            if (response.sucess) {
                setDoctor(response.data);
            } else {
                message.error(response.message)
            }
            dispatch(ShowLoader(false))
        } catch (error) {
            message.error(error.message)
            ShowLoader(false)
        }
    }

    useEffect(() => {
        getData()
    }, [id ])

    return (
        doctor && (<div className='bg-white p-2'>
            <h1 className='uppercase'>
                {doctor?.firstName}  {doctor?.lastName}
            </h1>
        </div>)
    )
}

export default Booking