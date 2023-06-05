import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        if (!user) {
           navigate('/login');
        }
    })



    return (
        <div className='layout p-2'>
            <div className="header bg-white p-2 flex justify-between items-center">
                <h2>
                    <strong>HEALTHY</strong>
                </h2>
                { user && <div className='flex items-center gap-1'>
                    <i className="ri-shield-user-line"></i>
                    <h3 className='uppercase underline pointer'>{user.name}</h3>

                    <i 
                        className ="ri-logout-box-r-line"
                        onClick={() => {
                            localStorage.removeItem('user')
                            navigate('/login')
                        }}
                    />
                </div>}
            </div>
            <div className="content">{children}</div>
        </div>
    )
}

export default ProtectedRoutes
