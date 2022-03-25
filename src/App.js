import MainHeader from './components/layout/MainHeader';
import AllCountries from './pages/AllCountries';
import CountryDetails from './pages/CountryDetails';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route path='/' element={<Navigate to='/countries' />} />
				<Route path='/countries' element={<AllCountries />} />
				<Route path='/countries/:countryId' element={<CountryDetails />} />
			</Routes>
		</>
	);
}
export default App;
