import React, { useEffect, useState } from 'react';
import './main.css';

const Main = () => {
	const [searchedVal, setSearchedVal] = useState('');
	const [weather, setWeather] = useState([]);
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();
	}, [searchedVal]);

	const loadData = () => {
		setLoading(true);
		fetch(
			`https://api.weatherapi.com/v1/current.json?key=122458a34a974f2885d101422222212&q=${
				searchedVal || 'baku'
			}&aqi=yes`
		)
			.then((res) => res.json())
			.then((data) => {
				setWeather(data);
				setLoading(false);
			})
			.catch((err) => setError(err));
	};

	useEffect(() => {
		console.log(weather);
	}, [weather]);

	return (
		<>
			<div className="wrapper">
				<form className="form" action="">
					<input
						value={searchedVal}
						onChange={(e) => setSearchedVal(e.target.value)}
						type="text"
						placeholder="search by name"
					/>
				</form>
				{loading ? (
					<h1>Loading...</h1>
				) : weather?.location ? (
					<main className="main">
						<div className="countryName">{weather.location?.name}</div>
						<div className="imgDiv">
							<img src={weather.current?.condition?.icon} alt="#" />
						</div>
						<p className="overcast">{weather.current?.condition?.text}</p>
						<p className="temp">{weather.current?.temp_c}°</p>
						<p className="dayTemp">{weather.current?.is_day}°</p>
						<footer className="footer">
							<span>wind on kph {weather.current?.wind_kph}</span>
							<span>wind on mph {weather.current?.wind_mph}</span>
							<span></span>
							<span></span>
						</footer>
					</main>
				) : (
					<h1>Country is Missing</h1>
				)}
			</div>
		</>
	);
};

export default Main;
