import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";

import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import NotFound from "./Pages/NotFound";
import Favorites from "./Pages/Favorites";

function RoutesApp() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/filme/:id" element={<MovieDetails />} />
				<Route path="/favoritos" element={<Favorites />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default RoutesApp;
