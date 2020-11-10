import React, { useState, useEffect, useContext } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import buildUrl from "../api/base";
import { Card } from "antd";
import {Link} from "react-router-dom";

const Movie = styled(Card)`
	&& {
		margin: 0.4rem 0 2.4rem 1.3rem;
		padding: 0.8rem;
		height: 100%;
		width: 100%;
	}
`;

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin: auto;
	padding: 0 0.8rem;
`;

const MovieList = () => {
	const { Meta } = Card;
	const [list, setList] = useState([]);
	const { movie, setMovie } = useContext(MovieContext);
	let url;

	if (movie) {
		url = buildUrl("query", movie);
	} else {
		url = buildUrl("popular", "");
	}

	async function fetchData(url) {
		const res = await fetch(url);
		res.json()
			.then((res) => {
				console.log(res.results);
				setList(res.results);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchData(url);
	}, [movie]);

	const mystyle = {
		color: "white",
		size: "64px",
		fontWeight: "bold",
		display: "block"
	  };

	return (
			<Content>
			{!movie &&
				<h1 style={mystyle}>Popular Movies</h1>
			}
			{movie && 
				<h1 style={mystyle}>Results:</h1>
			}
				{list &&
					list.map((item, index) => {
						const { title, release_date, poster_path, id } = item;
						const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
						if (title) {
							return (
								<Link to={
									{pathname: `/movie/${id}`}
								}>
									<Movie
										key={index}
										hoverable
										style={{ width: 250 }}
										cover={<img alt={title} src={imgUrl} />}
									>
										<Meta
											title={title}
											description={release_date}
										/>
									</Movie>
								</Link>
							);
						}
						return null;
					})}
			</Content>
	);
};

export default MovieList;
