import AppBarSVG from '../assets/App bar.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppBar() {

    const navigate = useNavigate();

    const { token, user, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        navigate('/home');
    };

    return (
        <div className="">
            <div className="appbar" style={{
                width: '100vw',
                height: '5rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: '0',
                left: '0',
                padding: '0 3rem',
            }}>
                <img src={AppBarSVG} alt=""
                    style={{
                        width: '100%',
                        height: '5rem',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '-1',
                    }} />
                <div className="d-flex flex-row align-items-center">
                    <div className="h1 text-light" style={{
                        fontFamily: 'Futura',
                    }}
                        onClick={
                            () => navigate('/home')
                        }
                    >
                        EtherWork
                    </div>
                    <div className="action-row d-flex flex-row ps-5" style={{
                        fontFamily: 'Futura',
                    }}>
                        <div className="btn text-light" onClick={
                            () => navigate('/home')
                        }>
                            Home
                        </div>
                        <div className="btn text-light" onClick={
                            () => navigate('/explore')
                        }>
                            Explore
                        </div>
                        <div className="btn text-light" onClick={() => navigate('/my-projects')}>
                            My Projects
                        </div>
                    </div>
                </div>
                {token ?
                    <div className="d-flex flex-row gap-3">
                        <div className="btn btn-link" style={{
                            fontFamily: 'Futura',
                            textDecoration: 'none',
                            color: 'white',
                        }}
                            onClick={
                                () => navigate('/profile')
                            }
                        >
                            {user?.name}
                        </div>
                        <div className="btn btn-outline-light me-3" onClick={
                            () => handleLogout()
                        }>
                            Logout
                        </div>

                    </div>
                    :
                    <div className="button-row d-flex flex-row align-items-center" style={{
                        fontFamily: 'Futura',
                    }}>
                        <div className="btn text-light me-3" onClick={
                            () => navigate('/auth/login')
                        }>
                            Login
                        </div>
                        <div className="btn btn-outline-light" onClick={
                            () => navigate('/auth/register')
                        }>
                            Sign Up
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}