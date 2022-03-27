import styles from './SearchFilter.module.css';
import { TextInput, Select } from '@mantine/core';

const SearchFilter = () => {
	return (
		<div className={styles['search-filter']}>
			<TextInput
				type='text'
				name='search'
				placeholder='Search for a country...'
			/>
			<Select
				placeholder='Filter by region'
				data={[
					{ value: 'africa', label: 'Africa' },
					{ value: 'america', label: 'America' },
					{ value: 'asia', label: 'Asia' },
					{ value: 'europe', label: 'Europe' },
					{ value: 'oceania', label: 'Oceania' },
				]}
			/>
		</div>
	);
};

export default SearchFilter;
