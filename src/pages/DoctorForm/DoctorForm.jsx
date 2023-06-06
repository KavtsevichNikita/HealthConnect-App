import React, { useEffect, useState } from 'react'
import { Form, Row, Col, message } from 'antd'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../../redux/loaderSlice';
import { AddDoctor, CheckIfDoctorAccountIsApplied } from '../../api/doctors';
import { useNavigate } from 'react-router-dom';

function DoctorForm() {

   const [days, setDays] = useState([]);
   const [valid, setValid] = useState(false)
   const dispatch = useDispatch();
   const navigate = useNavigate()


   const checkIfAlreadyApplied = async () => {
      try {
         dispatch(ShowLoader(true))
         const response = await CheckIfDoctorAccountIsApplied(JSON.parse(localStorage.getItem('user')).id)
         if (response.sucess) {
            setValid(true)
         }
         dispatch(ShowLoader(false))

      } catch (error) {
         dispatch(ShowLoader(false))
         message.error(error.message)
      }
   }


   useEffect(() => {
      checkIfAlreadyApplied()
   }, [])

   const onFinish = async (values) => {
      try {

         dispatch(ShowLoader(true))
         const payload = {
            ...values,
            days,
            userId: JSON.parse(localStorage.getItem('user')).id,
            status: 'pending',
            role: 'doctor'
         }

         const response = await AddDoctor(payload);
         if (response.sucess) {
            message.success(response.message);
            navigate('/profile')
         } else {
            message.error(response.message)
         }
         dispatch(ShowLoader(false))

      } catch (error) {
         dispatch(ShowLoader(false))
         message.error(error.message)

      }
   }

   return (
      <div className='bg-white p-2'>
         {!valid && <> <h3 className='uppercase my-1'>Apply for a Doctor Account</h3>
            <hr />

            <Form layout='vertical' className='my-1' onFinish={onFinish}>
               <Row gutter={[16, 16]}>
                  <Col span={24}>
                     <h4 className='uppercase'>
                        <b>Personal Information</b>
                     </h4>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='First Name'
                        name='firstName'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="text" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Last Name'
                        name='lastName'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="text" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="email" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="number" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Website'
                        name='website'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="number" />
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item
                        label='Address'
                        name='address'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <textarea type="text" />
                     </Form.Item>
                  </Col>

                  <Col span={24}>
                     <hr />
                  </Col>

                  {/* prof info */}

                  <Col span={24}>
                     <h4 className='uppercase'>
                        <b>Professional Information</b>
                     </h4>
                  </Col>

                  <Col span={8}>
                     <Form.Item
                        label='Speciality'
                        name='speciality'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <select name="" id="">
                           <option value="dermetologist">Dermetologist</option>
                           <option value="cardiologist">Cardiologist</option>
                           <option value="gynecologist">Gynecologist</option>
                           <option value="neurologist">Neurologist</option>

                        </select>
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Experience'
                        name='experience'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type='number'></input>
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Qualification'
                        name='qualification'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <select>
                           <option value="MBBS">MBBS</option>
                           <option value="MD">MD</option>
                           <option value="MS">MS</option>
                           <option value="MDS">MDS</option>
                        </select>
                     </Form.Item>
                  </Col>

                  <Col span={24}>
                     <hr />
                  </Col>

                  <Col span={24}>
                     <h4 className='uppercase'>
                        <b>Work Hours</b>
                     </h4>
                  </Col>


                  {/* work hours */}

                  <Col span={8}>
                     <Form.Item
                        label='Start Time'
                        name='startTime'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="time" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='End Time'
                        name='endTime'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="time" />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        label='Fee'
                        name='fee'
                        rules={[
                           {
                              required: true,
                              message: 'Required'
                           }
                        ]}
                     >
                        <input type="number" />
                     </Form.Item>
                  </Col>

                  <Col span={24}>
                     <div className="flex gap-1">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                           <div className="flex items-center">
                              <input type='checkbox' key={index} value={day} onChange={(e) => {
                                 if (e.target.checked) {
                                    setDays([...days, e.target.value])
                                 } else {
                                    setDays(days.filter((item) => item !== e.target.value))
                                 }
                              }} />
                              <label>{day}</label>
                           </div>
                        ))}
                     </div>
                  </Col>
               </Row>
               <div className="flex justify-end gap-2">
                  <button type="submit" className='outlined-btn'>CANCEL</button>
                  <button type="submit" className='contained-btn'>SUBMIT</button>
               </div>
            </Form> </>}

         {valid &&
            <div className="flex flex-col item-center gap-2">
               <h3 className="text-secondary">You have alreay applied for this doctor account, wait for admin to approve you request</h3>
            </div>
         }
      </div>
   )
}

export default DoctorForm
