import React, { useEffect, useState } from "react";
import buildUrl from "../api/base";
import { Layout, Divider, Row, Col, Image, Button, Typography, Space } from "antd";
import { useParams } from "react-router";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Text, Title, Paragraph } = Typography;

const GoBackButton = styled(Button)`
	background: rgba(0, 0, 0, 0);
	border: none;
	position: relative;
	top: 25px;
	right: 50px;
`;

const MovieTitle = styled.span`
	color: #e3f4fc;
	font-family: Roboto;
	font-style: bold;
	font-size: 28px;
	line-height: 30px;
	line-height: 87.89%;
	align: left;
	vertical-align: top;
`;

const MovieRating = styled.span`
	color: #b8d8e5;
	font-family: Roboto;
	font-style: regulat;
	font-size: 12px;
	line-height: 21px;
	line-height: 143.56%;
	align: left;
	vertical-align: top;
`;
const PostImg = styled(Image)`
	position: relative;
	z-index: 1;
	bottom: 70px;
	left: -30px;
	.ant-image-img {
		border-radius: 12px;
	}
`;

const SubTitle = styled.h1`
	color: rgb(255, 255, 255);
	font-style: Bold;
	font-size: 20px;
	line-height: 24px;
	line-height: 98.44%;
	align: Left;
	margin-left: 1rem;
`;

const Overview = styled.p`
	font0-family: Roboto;
	font0-style: Regular;
	font0-size: 16px;
	line-height: 24px;
	line-height: 128%;
	align: left;
	vertical-align: top;
	color: #9fbbc7;
	margin-left: 1rem;
	margin-right: 1rem;
`;

function BackButton() {
	let history = useHistory();
	return (
		<GoBackButton
			type="primary"
			onClick={() => history.goBack()}
			icon={<ArrowLeftOutlined />}
		/>
	);
}

export default function MovieDetailPage() {
	const { id } = useParams();
	console.log(id);
	const [detail, setDetail] = useState("");
	const url = buildUrl("search", id);
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
	}, [url]);
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
	console.log("+++++++++++++++", detail.release_date);
	// const [year, month, day] = detail.release_date.split("-");
	return (
		<Layout
			data-cy="detail"
			style={{
				backgroundColor: "#081b23",
				overflow: "auto",
				display: "block",
				width: "100%",
				height: "100%",
				position: "absolute"
			}}
		>
			<Head>
				<BackButton></BackButton>
			</Head>
			<Content>
				<Row justify="space-around" align="middle">
					<Col span={4}>
						<PostImg width={140} src={imgUrl}></PostImg>
					</Col>
					<Col span={4}>
						<Space direction="vertical">
							<MovieTitle>{detail.title}</MovieTitle>
							<MovieRating>
								{" "}
								· {detail.vote_average * 10}% User Score{" "}
								{Math.floor(detail.runtime / 60)}h {detail.runtime % 60}
								min
							</MovieRating>
						</Space>
					</Col>

				</Row>
				<Divider style={{ borderTop: "1px solid #0F303D" }} />
				<SubTitle>Overview</SubTitle>
				<Overview>{detail.overview}</Overview>
			</Content>
		</Layout>
	);
}
