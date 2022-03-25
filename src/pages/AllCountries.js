import { useLocation } from 'react-router-dom';

const AllCountries = () => {
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);

	return (
		<div>
			<h1>All Countries</h1>
		</div>
	);
};

export default AllCountries;
