import styles from './CountryDetailsItem.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CountryDetailsItem = (props) => {
	const navigate = useNavigate();
	const navigateBack = () => {
		navigate(-1);
	};

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
								{props.population}
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
							<div className={styles['country__info-desc__row']}>
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Top Level Domain:</span>{' '}
									{props.topLevelDomain.map((item) => (
										<span>{item} </span>
									))}
								</p>
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Currencies:</span>{' '}
									{props.currencies.map((item) => (
										<span>{item.name} </span>
									))}
								</p>
								<p className={styles['country__info-desc__item']}>
									<span className={styles['bold']}>Languages:</span>{' '}
									{props.languages.map((item) => (
										<span>{item.name} </span>
									))}
								</p>
							</div>
						</div>
					</div>
					<div className={styles['country__info-borders']}>
						<span className={styles['bold']}>Border Countries: </span>
						{props.borders.map((item) => (
							<div className={styles['country__info-borders__item']}>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CountryDetailsItem;
