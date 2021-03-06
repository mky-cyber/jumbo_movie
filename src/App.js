import "./App.css";
import MovieContext from "./context/MovieContext";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import MovieDetailPage from "./components/MovieDetailPage";
import { useMemo, useState } from "react";

function App() {
	const [movie, setMovie] = useState("");
	const movieValue = useMemo(() => ({ movie, setMovie }), [movie, setMovie]);
	return (
			<MovieContext.Provider value={movieValue}>
				<Router>
					<Switch>
							<Route exact path="/" component={MainPage}>
							</Route>
							<Route exact path="/movie/:id" component={MovieDetailPage}>
							</Route>
					</Switch>
				</Router>
			</MovieContext.Provider>
	);
}

export default App;
