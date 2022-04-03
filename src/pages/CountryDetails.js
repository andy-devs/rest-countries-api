import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import CountryDetailsItem from '../components/countries/CountryDetailsItem';

const CountryDetails = () => {
	const [countryData, setCountryData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const params = useParams();

	const countryId = params.countryId;

	useEffect(() => {
		const fetchCountryDetails = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`https://restcountries.com/v2/alpha/${countryId}`
				);
				const data = await response.json();
				setIsLoading(false);
				setCountryData(data);
			} catch (error) {
				setIsLoading(false);
				setError(error.message);
			}
		};
		fetchCountryDetails();
	}, [countryId]);

	return (
		<div>
			{isLoading && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '2rem',
					}}>
					<Oval
						ariaLabel='loading-indicator'
						height={100}
						width={100}
						strokeWidth={3}
						color='var(--text-color)'
						secondaryColor='var(--elements-color)'
					/>
				</div>
			)}
			{!isLoading && error && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '2rem',
					}}>
					{error}
				</div>
			)}
			{!isLoading && !error && Object.keys(countryData).length > 0 && (
				<CountryDetailsItem {...countryData} />
			)}
		</div>
	);
};

export default CountryDetails;
