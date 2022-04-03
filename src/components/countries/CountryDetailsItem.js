import styles from './CountryDetailsItem.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';

const CountryDetailsItem = (props) => {
	const navigate = useNavigate();

	const [bordersContent, setBordersContent] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigateBack = () => {
		navigate(-1);
	};

	const parsedPopulation = props.population
		? props.population
				.toString()
				.match(/\d{1,3}(?=(\d{3})*$)/g)
				.join(',')
		: null;

	const parsedCurrencies = props.currencies
		? props.currencies.map((currency) => currency.name).join(', ')
		: null;

	const parsedLanguages = props.languages
		? props.languages.map((language) => language.name).join(', ')
		: null;

	useEffect(() => {
		const fetchBorders = async () => {
			setIsLoading(true);
			const borderCountries = await Promise.all(
				props.borders.map((country) =>
					fetch(`https://restcountries.com/v2/alpha/${country}`)
						.then((response) => response.json())
						.then((data) => data)
				)
			);
			if (borderCountries.length === props.borders.length) {
				setBordersContent(borderCountries);
				setIsLoading(false);
			}
		};

		if (props.borders) {
			fetchBorders();
		}
	}, [props.borders]);

	let spinner;

	if (isLoading || bordersContent.length !== props.borders.length) {
		spinner = <ThreeDots color='var(--text-color)' />;
	} else {
		spinner = null;
	}

	return (
		<>
			<button className={styles['back-button']} onClick={navigateBack}>
				<FontAwesomeIcon icon={faArrowLeft} /> Back
			</button>
			<div className={styles['country']}>
				<img
					className={styles['country__flag']}
					src={props.flag}
					alt={`${props.name} flag`}
				/>
				<div className={styles['country__info']}>
					<h1 className={styles['country__info-name']}>{props.name}</h1>
					<div className={styles['country__info-desc']}>
						<div className={styles['country__info-desc__row']}>
							{props.nativeName && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Native Name:</span>{' '}
									{props.nativeName}
								</p>
							)}
							{parsedPopulation && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Population:</span>{' '}
									{parsedPopulation}
								</p>
							)}
							{props.region && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Region:</span> {props.region}
								</p>
							)}
							{props.subregion && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Sub region:</span>{' '}
									{props.subregion}
								</p>
							)}
							{props.capital && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Capital:</span>{' '}
									{props.capital}
								</p>
							)}
						</div>
						<div className={styles['country__info-desc__row']}>
							{props.topLevelDomain && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Top Level Domain:</span>{' '}
									{props.topLevelDomain.map((item) => (
										<span>{item}</span>
									))}
								</p>
							)}
							{parsedCurrencies && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Currencies:</span>{' '}
									{parsedCurrencies}
								</p>
							)}
							{parsedLanguages && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Languages:</span>{' '}
									{parsedLanguages}
								</p>
							)}
						</div>
					</div>

					<div className={styles['country__info-borders']}>
						{props.borders && (
							<span className={styles['country__info-borders__head']}>
								Border Countries:{' '}
							</span>
						)}
						{spinner}
						{bordersContent.length === props.borders.length &&
							bordersContent.map((item) => (
								<Link
									to={`/countries/${item.alpha2Code.toLowerCase()}`}
									className={styles['country__info-borders__item']}>
									{item.name}
								</Link>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CountryDetailsItem;
