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
		const filterCountries = (searchValue, filterValue) => {
			let filtered;
			let condition;
			if (searchValue !== '' && filterValue) {
				filtered = countries.filter(
					(country) =>
						country.name.includes(searchValue) &&
						country.region.includes(filterValue)
				);
				condition = searchValue !== '' && filterValue;
			} else if (searchValue !== '' && !filterValue) {
				filtered = countries.filter((country) =>
					country.name.includes(searchValue)
				);
				condition = searchValue !== '';
			} else if (searchValue === '' && filterValue) {
				filtered = countries.filter((country) =>
					country.region.includes(filterValue)
				);
				condition = filterValue;
			} else {
				setNoneFound(false);
				setFilteredCountries([]);
				return;
			}
			console.log(filtered, condition);
			setFilteredCountries(() => filtered);
			if (condition) {
				setNoneFound(true);
			} else {
				setNoneFound(false);
			}
		};
		const timer = setTimeout(() => {
			filterCountries(searchValue, filterValue);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [searchValue, filterValue, countries]);

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
					textAlign: 'center',
					fontSize: '1.5rem',
					marginTop: '2rem',
				}}>
				{error}
			</p>
		);
	}

	if (!isLoading && !error) {
		if (filteredCountries.length === 0 && noneFound) {
			content = (
				<p
					style={{
						textAlign: 'center',
						fontSize: '1.5rem',
						marginTop: '2rem',
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
		} else {
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
