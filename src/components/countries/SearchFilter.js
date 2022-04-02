import styles from './SearchFilter.module.css';
import { TextInput, Select } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = (props) => {
	return (
		<div className={styles['search-filter']}>
			<TextInput
				classNames={{
					wrapper: styles.input,
					input: styles.input__text,
				}}
				variant='unstyled'
				type='text'
				name='search'
				placeholder='Search for a country...'
				icon={<FontAwesomeIcon icon={faMagnifyingGlass} size='sm' />}
				onChange={props.searchChangeHandler}
				value={props.searchValue}
			/>
			<Select
				classNames={{
					dropdown: styles.select__drop,
					unstyledVariant: styles.select,
					input: styles.select__text,
					item: styles.select__item,
					hovered: styles['select__item-hovered'],
					selected: styles['select__item-selected'],
				}}
				clearable
				variant='unstyled'
				placeholder='Filter by region'
				data={[
					{ value: 'Africa', label: 'Africa' },
					{ value: 'America', label: 'America' },
					{ value: 'Asia', label: 'Asia' },
					{ value: 'Europe', label: 'Europe' },
					{ value: 'Oceania', label: 'Oceania' },
				]}
				onChange={props.filterChangeHandler}
				value={props.filterValue}
			/>
		</div>
	);
};

export default SearchFilter;
