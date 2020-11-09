export default function buildUrl(type, para) {
	const key = process.env.REACT_APP_MOVIE_API_KEY;
	let baseUrl;
	switch (type) {
		case "search":
			baseUrl = `https://api.themoviedb.org/3/movie/${para}?api_key=${key}`;
			break;
		case "query":
			baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${para}`;
			break;
		case "popular":
			baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
			break;
		default:
			baseUrl = "";
	}
	console.log("type, para, base url", type, para, baseUrl);
	return baseUrl;
}
