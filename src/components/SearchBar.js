import React, { useContext } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import MovieContext from "../context/MovieContext";

const Search = styled(Input)`
	&& {
		color: green;
		border-radius: 100px;
		height: 3.5em;
		input,
		select,
		textarea,
		padding-top: 90px;
		placeholder {
			color: green;
		}
	}
`;

export default function SearchBar() {
	const { movie, setMovie } = useContext(MovieContext);
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
				console.log(title);
			}}
		/>
	);
};
