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
					<span className={styles.bold}>Population:</span> {population}
				</p>
				<p className={styles.country__info}>
					<span className={styles.bold}>Region:</span> {region}
				</p>
				<p className={styles.country__info}>
					<span className={styles.bold}>Capital:</span> {capital}
				</p>
			</div>
		</div>
	);
};

export default Country;
