import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import { Layout, Image, Space } from "antd";
import styled from "styled-components";
import TMDB from "./TMDB.svg";
import Group from "./Group.svg";

const Content = styled(Layout.Content)`
	&& {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		background-color: #081b23;
		overflow: auto;
	}
`;

const Header = styled.div`
	padding: 25px;
	text-align: center;
	color: white;
	font-size: 30px;
	border-style: none;
	background: radial-gradient(82.98% 213.08% at 53.46% -21.35%, rgba(5, 112, 172, 0.46) 0%, rgba(8, 27, 35, 0) 75%);
`;

export default function MainPage() {
	return (
		<Layout>
			<Content>
				<Header>
					<Image src={Group} width={"100%"} style={{left:0, top: 0, zIndex: 0, position: "absolute"}}/>
					<Image src={TMDB} width={100} style={{paddingBottom: 40, paddingTop: 60 }}/>
				</Header>
				<SearchBar />
				<MovieList />
			</Content>
		</Layout>
	);
}
