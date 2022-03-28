import styles from './SearchFilter.module.css';
import { TextInput, Select } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = () => {
	return (
		<div className={styles['search-filter']}>
			<TextInput
				className={styles.input}
				variant='unstyled'
				type='text'
				name='search'
				placeholder='Search for a country...'
				icon={<FontAwesomeIcon icon={faMagnifyingGlass} size='sm' />}
			/>
			<Select
				classNames={{
					dropdown: styles.select__drop,
					unstyledVariant: styles.select,
				}}
				clearable
				variant='unstyled'
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
