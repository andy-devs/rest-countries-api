import { useLocation } from 'react-router-dom';
import SearchFilter from '../components/countries/SearchFilter';
import CountriesList from '../components/countries/CountriesList';

const AllCountries = () => {
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);

	return (
		<main className='main'>
			<SearchFilter />
			<CountriesList />
		</main>
	);
};

export default AllCountries;
