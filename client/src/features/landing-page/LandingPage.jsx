
import '../../styles/LandingPage.css'
import AppBar from '../../components/AppBar';
import PopularChoices from './PopularChoices';
import SearchComponent from './SearchComponent';
import ServiceTypes from './ServiceTypes';
import Footer from '../../components/Footer';
import AuthenticationPage from '../authentication/AuthenticationPage';

export default function LandingPage() {
    return (
        <div className="" style={{
        }}>
            <AppBar />
            <PopularChoices />
            <SearchComponent />
            <ServiceTypes />
            <Footer />
        </div>

    );
}
















