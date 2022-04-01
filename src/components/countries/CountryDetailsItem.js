import styles from './CountryDetailsItem.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CountryDetailsItem = (props) => {
	const navigate = useNavigate();

	const [bordersContent, setBordersContent] = useState([]);

	const navigateBack = () => {
		navigate(-1);
	};

	const parsedPopulation = props.population
		.toString()
		.match(/\d{1,3}(?=(\d{3})*$)/g)
		.join(',');

	const parsedCurrencies = props.currencies
		.map((currency) => currency.name)
		.join(', ');

	const parsedLanguages = props.languages
		.map((language) => language.name)
		.join(', ');

	useEffect(() => {
		console.log(props.borders);
		console.log(bordersContent);
	});

	useEffect(() => {
		if (props.borders) {
			setBordersContent([]);
			for (let country of props.borders) {
				fetch(`https://restcountries.com/v2/alpha/${country}`)
					.then((response) => response.json())
					.then((data) => setBordersContent((prev) => [...prev, data]));
			}
		}
	}, [props.borders]);

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
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Native Name:</span>{' '}
								{props.nativeName}
							</p>
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Population:</span>{' '}
								{parsedPopulation}
							</p>
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Region:</span> {props.region}
							</p>
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Sub region:</span>{' '}
								{props.subregion}
							</p>
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Capital:</span> {props.capital}
							</p>
						</div>
						<div className={styles['country__info-desc__row']}>
							<p className={styles['country__info-desc__item']}>
								<span className={styles['bold']}>Top Level Domain:</span>{' '}
								{props.topLevelDomain.map((item) => (
									<span>{item}</span>
								))}
							</p>
							{parsedCurrencies.length > 0 && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Currencies:</span>{' '}
									{parsedCurrencies}
								</p>
							)}
							{parsedLanguages.length > 0 && (
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Languages:</span>{' '}
									{parsedLanguages}
								</p>
							)}
						</div>
					</div>

					{bordersContent.length > 0 && (
						<div className={styles['country__info-borders']}>
							<span className={styles['country__info-borders__head']}>
								Border Countries:{' '}
							</span>
							<div className={styles['country__info-borders__items']}>
								{bordersContent.map((item) => (
									<Link
										to={`/countries/${item.alpha2Code.toLowerCase()}`}
										className={styles['country__info-borders__item']}>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CountryDetailsItem;
