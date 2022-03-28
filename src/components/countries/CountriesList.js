import styles from './CountriesList.module.css';
import { useEffect, useState } from 'react';
import Country from './Country';

const CountriesList = () => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchAllCountries = async () => {
			const response = await fetch('https://restcountries.com/v2/all');
			const data = await response.json();
			console.log(data);
			setCountries(data);
		};
		fetchAllCountries();
	}, []);

	return (
		<div className={styles['countries-grid']}>
			{countries.length > 0 &&
				countries.map((country) => (
					<Country
						key={country.numericCode}
						name={country.name}
						flag={country.flag}
						population={country.population}
						region={country.region}
						capital={country.capital}
					/>
				))}
		</div>
	);
};

export default CountriesList;
