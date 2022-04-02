import styles from './MainHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as faMoonDark } from '@fortawesome/free-solid-svg-icons';
import { faMoon as faMoonLight } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useCallback } from 'react';

const MainHeader = () => {
	const [theme, setTheme] = useState('light');

	const setToTheme = useCallback((theme) => {
		const themeData = {
			darkBackground: 'hsl(207, 26%, 17%)',
			darkElements: 'hsl(209, 23%, 22%)',
			darkText: 'hsl(0, 0%, 100%)',
			lightBackground: 'hsl(0, 0%, 98%)',
			lightElements: 'hsl(0, 0%, 100%)',
			lightText: 'hsl(200, 15%, 8%)',
			lightInput: 'hsl(0, 0%, 52%)',
		};
		if (theme === 'light') {
			localStorage.setItem('theme', 'light');
			document.documentElement.style.setProperty(
				'--text-color',
				themeData.lightText
			);
			document.documentElement.style.setProperty(
				'--background-color',
				themeData.lightBackground
			);
			document.documentElement.style.setProperty(
				'--elements-color',
				themeData.lightElements
			);
			setTheme('light');
		} else if (theme === 'dark') {
			localStorage.setItem('theme', 'dark');
			document.documentElement.style.setProperty(
				'--text-color',
				themeData.darkText
			);
			document.documentElement.style.setProperty(
				'--background-color',
				themeData.darkBackground
			);
			document.documentElement.style.setProperty(
				'--elements-color',
				themeData.darkElements
			);

			setTheme('dark');
		}
	}, []);
	useEffect(() => {
		const themeData = localStorage.getItem('theme');
		if (themeData) {
			setToTheme(themeData);
		} else {
			if (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				setToTheme('dark');
			} else {
				setToTheme('light');
			}
		}
	}, [setToTheme]);

	const themeChangeHandler = () => {
		if (theme === 'light') {
			setToTheme('dark');
		} else if (theme === 'dark') {
			setToTheme('light');
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<p className={styles.header__logo}>Where in the world?</p>
				<button
					className={styles['header__theme-button']}
					onClick={themeChangeHandler}>
					{theme === 'dark' && (
						<FontAwesomeIcon
							icon={faMoonDark}
							className={styles['header__theme-button__icon']}
						/>
					)}
					{theme === 'light' && (
						<FontAwesomeIcon
							icon={faMoonLight}
							className={styles['header__theme-button__icon']}
						/>
					)}
					<span className={styles['header__theme-button__text']}>
						Dark mode
					</span>
				</button>
			</div>
		</header>
	);
};

export default MainHeader;
