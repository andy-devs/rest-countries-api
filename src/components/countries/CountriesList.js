import styles from './CountriesList.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import SearchFilter from '../countries/SearchFilter';
import Country from './Country';

const CountriesList = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [noneFound, setNoneFound] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filterValue, setFilterValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);

	useEffect(() => {
		const fetchAllCountries = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('https://restcountries.com/v2/all');
				const data = await response.json();
				setCountries(data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
			}
		};
		fetchAllCountries();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setFilteredCountries(() =>
				countries.filter((country) => country.name.includes(searchValue))
			);
			if (
				countries.filter((country) => country.name.includes(searchValue))
					.length === 0 &&
				searchValue !== ''
			) {
				setNoneFound(true);
			} else {
				setNoneFound(false);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [searchValue, countries]);

	const searchChangeHandler = (e) => {
		setSearchValue(e.target.value);
	};

	const filterChangeHandler = (e) => {
		setFilterValue(e);
	};

	let content = (
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
				color='black'
				secondaryColor='white'
			/>
		</div>
	);

	if (error) {
		content = (
			<p
				style={{
					'text-align': 'center',
					'font-size': '1.5rem',
					'margin-top': '2rem',
				}}>
				{error}
			</p>
		);
	}

	if (!isLoading && !error) {
		if (filteredCountries.length === 0 && noneFound === true) {
			content = (
				<p
					style={{
						'text-align': 'center',
						'font-size': '1.5rem',
						'margin-top': '2rem',
					}}>
					None countries found
				</p>
			);
		} else if (filteredCountries.length > 0) {
			content = (
				<div className={styles['countries-grid']}>
					{filteredCountries.map((country) => (
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
		} else if (filteredCountries.length === '' && noneFound === false) {
			content = (
				<div className={styles['countries-grid']}>
					{countries.map((country) => (
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
		}
	}

	return (
		<>
			<SearchFilter
				searchValue={searchValue}
				searchChangeHandler={searchChangeHandler}
				filterValue={filterValue}
				filterChangeHandler={filterChangeHandler}
			/>
			{content}
		</>
	);
};

export default CountriesList;
