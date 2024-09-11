import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


import AppBarWave from '../../assets/AppBar Background.png';

export default function AuthenticationPage(props) {

    // const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const { formType } = useParams();


    return (
        <div className="" style={{
            width: '100vw',
            height: '100vh',
        }}>
            <div className="appbar" style={{
                width: '100vw',
                height: '10rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'start',
                position: 'sticky',
                top: '0',
                left: '0',
            }}>
                <img src={AppBarWave} alt="" style={{
                    width: '100vw',
                    objectFit: 'fill',
                    position: 'absolute',
                    zIndex: '-1',
                }} />
                <div className="h1 text-light m-4" style={{
                    fontFamily: 'Futura',
                }}>
                    EtherWork
                </div>
                <div className="btn btn-outline-light m-4" onClick={
                    () => navigate('/home')
                }>
                    Back Home
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{
                width: '100vw',
                height: '70vh',
            }}>
                {formType === 'register' ?
                    <RegisterForm />
                    :
                    <LoginForm />}
            </div >
        </div>

    );
}