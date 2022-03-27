import styles from './SearchFilter.module.css';

const SearchFilter = () => {
	return (
		<div className={styles['search-filter']}>
			<input
				className={styles.input}
				type='text'
				name='search'
				placeholder='Search for a country...'
			/>
			<select className={styles.select}>
				<option value='' disabled selected hidden>
					Filter by region
				</option>
				<option value='africa'>Africa</option>
				<option value='america'>America</option>
				<option value='asia'>Asia</option>
				<option value='europe'>Europe</option>
				<option value='oceania'>Oceania</option>
			</select>
		</div>
	);
};

export default SearchFilter;
