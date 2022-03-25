import { useParams } from 'react-router-dom';

const CountryDetails = () => {
	const params = useParams();
	console.log(params.countryId);

	return (
		<div>
			<h1>Country Details</h1>
		</div>
	);
};

export default CountryDetails;
