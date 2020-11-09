import React, { useContext } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const Search = styled(Input)`
	&& {
		color: green;
		border-radius: 100px;
		height: 3.5em;
		input,
		select,
		textarea,
		placeholder {
			color: green;
		}
	}
`;

export default function SearchBar() {
	return (
		<Search
			placeholder="Search"
			size="large"
			data-cy='search'
			suffix={<SearchOutlined />}
			onPressEnter={(ev) => {
				let title = ev.target.value;
				title = title.replace(/\s/g, '+');
				console.log(title);
			}}
		/>
	);
};
