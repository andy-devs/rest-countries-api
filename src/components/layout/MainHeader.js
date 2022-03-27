import styles from './MainHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoon as faMoonDark } from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonLight } from '@fortawesome/free-regular-svg-icons';

const MainHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<p className={styles.header__logo}>Where in the world?</p>
				<button className={styles['header__theme-button']}>
					{/* <FontAwesomeIcon icon={faMoonDark} /> */}
					<FontAwesomeIcon
						icon={faMoonLight}
						className={styles['header__theme-button__icon']}
					/>
					<span className={styles['header__theme-button__text']}>
						Dark mode
					</span>
				</button>
			</div>
		</header>
	);
};

export default MainHeader;
