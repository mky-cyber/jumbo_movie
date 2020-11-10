import React, { useEffect, useState, useContext } from "react";
import MovieContext from "../context/MovieContext";
import buildUrl from "../api/base";
import { Layout, Divider, Descriptions, Image, Button } from "antd";
import { useParams } from "react-router";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const GoBackButton = styled(Button)`
	background: rgba(0,0,0,0.5);
	border: none;
	position: relative;
	top: 25px;
	right: 50px;	
`;

function BackButton() {
	let history = useHistory();
	return (
		<GoBackButton type="primary" onClick={() => history.goBack()} icon={<ArrowLeftOutlined />} />
	);
}

export default function MovieDetailPage() {
	const { id } = useParams();
	console.log(id);
	const [detail, setDetail] = useState("");
	const url = buildUrl("search", id);
	const { movie } = useContext(MovieContext);
	console.log("Here is the url:", url);

	async function fetchData(url) {
		const res = await fetch(url);
		res.json()
			.then((res) => {
				console.log(res);
				setDetail(res);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchData(url);
	}, []);
	const imgUrl = `https://image.tmdb.org/t/p/w500${detail.poster_path}`;
	const backImg = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`;
	const Head = styled(Header)`
		background-image: url(${backImg});
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		width: 100%;
		height: 20rem;
	`;
	console.log("+++++++++++++++",detail.release_date);
	// const [year, month, day] = detail.release_date.split("-");
	return (
		<Layout data-cy='detail'>
			<Head>
				<BackButton></BackButton>
			</Head>
			<Content>
				<Layout>
					<Sider>
						<Image width={200} src={imgUrl}></Image>
					</Sider>
					<Content>
						<Descriptions title={detail.title}>
							<Descriptions.Item>
								{" "}
								· {detail.vote_average * 10}% User Score{" "}
								{Math.floor(detail.runtime / 60)}h{" "}
								{detail.runtime % 60}min
							</Descriptions.Item>
						</Descriptions>
					</Content>
				</Layout>
				<Divider />
				<Descriptions title="Overview">
					<Descriptions.Item>{detail.overview}</Descriptions.Item>
				</Descriptions>
			</Content>
		</Layout>
	);
}
