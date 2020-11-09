import "./App.css";
import { Layout } from "antd";
import MovieContext from "./context/MovieContext";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import { useMemo, useState } from "react";

const Content = styled(Layout.Content)`
	&& {
		padding: 24px 50px;
		min-height: 280px;
		background-color: #fff;
	}
`;

function App() {
	const [movie, setMovie] = useState("");

	const movieValue = useMemo(() => ({ movie, setMovie }), [movie, setMovie]);
	return (
		<Layout>
			<MovieContext.Provider value={movieValue}>
				<Router>
					<Switch>
						<Content>
							<MainPage></MainPage>
						</Content>
					</Switch>
				</Router>
			</MovieContext.Provider>
		</Layout>
	);
}

export default App;
