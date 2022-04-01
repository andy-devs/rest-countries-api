import styles from './Country.module.css';
import { Link } from 'react-router-dom';

const Country = ({ id, name, flag, population, region, capital }) => {
	const parsedPopulation = population
		.toString()
		.match(/\d{1,3}(?=(\d{3})*$)/g)
		.join(',');

	return (
		<div className={styles.country}>
			<Link className={styles.country__wrapper} to={`/countries/${id}`}>
				<div className={styles['country__flag-wrapper']}>
					<img
						className={styles.country__flag}
						src={flag}
						alt={`${name} flag`}
					/>
				</div>
				<div className={styles.country__description}>
					<p className={styles.country__name}>{name}</p>
					<p className={styles.country__info}>
						<span className={styles.bold}>Population:</span> {parsedPopulation}
					</p>
					<p className={styles.country__info}>
						<span className={styles.bold}>Region:</span> {region}
					</p>
					<p className={styles.country__info}>
						<span className={styles.bold}>Capital:</span> {capital}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Country;
