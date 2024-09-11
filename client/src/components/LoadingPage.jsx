import AppBarShape from '../../assets/AppBar Background.png';
import Logo from '../../assets/EtherWork-logo_3.png';
import Blob2 from '../../assets/blob-2.svg';
import Blob3 from '../../assets/blob-3.svg';
import Blob4 from '../../assets/blob-4.svg';
import Blob5 from '../../assets/blob-5.svg';


export default function LoadingPage() {
    return (
        <div className="background" style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-1',
        }}>
            <img src={AppBarShape}
                className='appbar-background'
                style={{
                    width: '100%',
                    height: '250px',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '5',
                }} alt="appbar-background" />
            <img src={Logo} alt="" style={{
                position: 'absolute',
                width: '50%',
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',

            }} />
            <img src={Blob2} alt="" style={{
                position: 'absolute',
                width: '20%',
                top: "20%",
                left: "10%",
            }} />
            <img src={Blob3} alt="" style={{
                position: 'absolute',
                width: '20%',
                top: "25%",
                left: "80%",
            }} />
            <img src={Blob4} alt="" style={
                {
                    position: 'absolute',
                    width: '25%',
                    top: "60%",
                    left: "70%",
                }
            } />
            <img src={Blob2} alt="" style={{
                position: 'absolute',
                width: '20%',
                top: "60%",
                left: "50%",
            }} />
            <img src={Blob5} alt="" style={{
                position: 'absolute',
                width: '30%',
                top: "60%",
                left: "15%",
            }} />
            <img src={Blob3} alt="" style={{
                position: 'absolute',
                width: '20%',
                top: "80%",
                left: "80%",
            }} />
            <img src={Blob4} alt="" style={{
                position: 'absolute',
                width: '25%',
                top: "80%",
                left: "10%",
            }} />
            <img src={Blob5} alt="" style={{
                position: 'absolute',
                width: '30%',
                top: "80%",
                left: "50%",
            }} />
            <img src={Blob2} alt="" style={{
                position: 'absolute',
                width: '20%',
                top: "60%",
                left: "50%",
            }} />
            <img src={Blob5} alt="" style={{
                position: 'absolute',
                width: '30%',
                top: "60%",
                left: "15%",
            }} />
        </div>
        
    );
}

{/* <div className="appbar px-3" style={{
                width: '100%',
                height: '100px',
                position: 'sticky',
                top: '0',
                left: '0',
                zIndex: '100',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'radial-gradient(59.68% 1.19% at 64.78% 0.61%, #6433FF 0%, #2C36CD 30%, #5925FF 41%, #2C36CD 70%, #6433FF 91%)',
            }}>
                <div className="h1 text-white">EtherWork</div>
                <div className="btn btn-outline-light">LogIn</div>
            </div> */}