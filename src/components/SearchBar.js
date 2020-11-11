import React, { useContext } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import MovieContext from "../context/MovieContext";

const Search = styled(Input)`
	&&{
		color: green;
		border-radius: 22px;
		height: 3.5em;
		input,
		select,
		textarea,
		position: absolute;
		left: 3%;
		right: 4.53%;
		top: 0%;
		bottom: 81.42%;
		placeholder {
			color: green;
		}
		width: 95%;
	}	
`;

export default function SearchBar() {
	const { setMovie } = useContext(MovieContext);
	return (
		<Search
			placeholder="Search"
			size="large"
			data-cy='search'
			suffix={<SearchOutlined />}
			onPressEnter={(ev) => {
				let title = ev.target.value;
				title = title.replace(/\s/g, '%20');
				setMovie(title);
			}}
		/>
	);
};
