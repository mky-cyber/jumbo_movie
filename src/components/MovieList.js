import React, { useState, useEffect, useContext } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import buildUrl from "../api/base";
import { Card, Typography, Image, Layout } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const Movie = styled(Card)`
	&& {
		margin: 0.4rem 0 2.4rem 1.3rem;
		padding: 0.8rem;
		height: 100%;
		width: 100%;
	}
`;

const Content = styled(Layout.Content)`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin: auto;
	padding: 0 0.8rem;
	position: absolute;
	left: 4.53%;
	top: 32%;
`;

const SubTitle = styled(Title)`
	position: absolute;
	left: 1.27%;
	right: 4.53%;
	top: 30%;
	bottom: 75.11%;
	font-family: Montserrat;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
`;

const MovieTitle = styled(Text)`
	color: #e6f7ff;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
`;

const MovieDesc = styled(Text)`
	color: #a1d1e6;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
`;

const CoverImg = styled(Image)`
	.ant-image-img {
		border-radius: 12px;
	}
`;

const MovieList = () => {
	const { Meta } = Card;
	const [list, setList] = useState([]);
	const { movie } = useContext(MovieContext);
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
	}, [url]);

	const mystyle = {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '20px',
		lineHeight: '24px',
		color: '#E3F4FC',
		display: "block"
	};

	return (
		<Layout>
			{!movie && <SubTitle style={mystyle}>Popular Movies</SubTitle>}
			{movie && <SubTitle style={mystyle}>Results:</SubTitle>}
			<Content data-cy="list">
				{list &&
					list.map((item, index) => {
						const { title, release_date, poster_path, id } = item;
						const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
						if (title) {
							return (
								<Link to={{ pathname: `/movie/${id}` }}>
									<Movie
										key={index}
										hoverable
										style={{
											width: 155,
											backgroundColor:
												"rgba(255, 255, 255, 0.0)",
											border: 0,
											margin: 0
										}}
										headStyle={{
											backgroundColor:
												"rgba(255, 255, 255, 0.0)",
											border: 0,
										}}
										bodyStyle={{
											backgroundColor:
												"rgba(0, 0, 0, 0.0)",
											border: 0,
											paddingLeft: 0,
										}}
										cover={
											<CoverImg
												alt={title}
												src={imgUrl}
											/>
										}
									>
										<Meta
											title={
												<MovieTitle>{title}</MovieTitle>
											}
											description={
												<MovieDesc>
													{release_date}
												</MovieDesc>
											}
										/>
									</Movie>
								</Link>
							);
						}
						return null;
					})}
			</Content>
		</Layout>
	);
};

export default MovieList;
