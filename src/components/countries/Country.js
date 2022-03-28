import styles from './Country.module.css';

const Country = ({ name, flag, population, region, capital }) => {
	return (
		<div className={styles.country}>
			<div className={styles['country__flag-wrapper']}>
				<img className={styles.country__flag} src={flag} alt={`${name} flag`} />
			</div>
			<div className={styles.country__description}>
				<p className={styles.country__name}>{name}</p>
				<p className={styles.country__info}>
					<b>Population:</b> {population}
				</p>
				<p className={styles.country__info}>
					<b>Region:</b> {region}
				</p>
				<p className={styles.country__info}>
					<b>Capital:</b> {capital}
				</p>
			</div>
		</div>
	);
};

export default Country;
