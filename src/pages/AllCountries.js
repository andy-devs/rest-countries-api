import { useLocation } from 'react-router-dom';
import SearchFilter from '../components/countries/SearchFilter';

const AllCountries = () => {
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);

	return (
		<main className='main'>
			<SearchFilter />
		</main>
	);
};

export default AllCountries;
