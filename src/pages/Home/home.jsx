import { Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice'
import { ApplyDoctors, GetAllDoctors } from '../../api/doctors'


function Home() {

    const [doctors = [], setDoctors] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await GetAllDoctors()
            if (response.sucess) {
                setDoctors(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(ShowLoader(false))
        } catch (error) {
            message.error(error.message)
            dispatch(ShowLoader(false))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <input placeholder="Search doctors" className='w-400 my-1' />
                </div>
                <button
                    className='outlined-btn my-1 min-w'
                    onClick={() => navigate('/apply-doctor')}
                >
                    Apply doctor
                </button>
            </div>

            <Row gutter={[16, 16]} className='my-1'>
                {doctors.map((doctor) => {
                    return (
                        <Col key={doctor.id} span={8}>
                            <div className="bg-white p-1 flex flex-column gap-1 uppercase pointer"
                            onClick={() => navigate(`/book-appoitment/${doctor.id}`)}>
                                <div className="flex justify-between w-full">
                                    <h2 className='uppercase'>
                                        {doctor.lastName} {doctor.firstName}
                                    </h2>
                                </div>

                                <hr/>

                                <div className="flex justify-between w-full">
                                    <h4>
                                        <b>Speciality : </b>
                                    </h4>
                                    <h4>
                                        {doctor.speciality}
                                    </h4>
                                </div>
                                <div className="flex justify-between w-full">
                                    <h4>
                                        <b>Experience : </b>
                                    </h4>
                                    <h4>
                                        {doctor.experience}
                                    </h4>
                                </div>
                                <div className="flex justify-between w-full">
                                    <h4>
                                        <b>Email : </b>
                                    </h4>
                                    <h4>
                                        {doctor.email}
                                    </h4>
                                </div>
                                <div className="flex justify-between w-full">
                                    <h4>
                                        <b>Phone : </b>
                                    </h4>
                                    <h4>
                                        {doctor.phone}
                                    </h4>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>


        </div>
    )
}

export default Home
