import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./favorites.css";

function Favorites() {
	const [favs, setFavs] = useState([]);

	useEffect(() => {
		const myFavs = localStorage.getItem("@cinepop");
		setFavs(JSON.parse(myFavs) || []);
	}, []);

	function excluirFilme(id) {
		let filtroFilmes = favs.filter((item) => {
			return item.id !== id;
		});

		setFavs(filtroFilmes);
		localStorage.setItem("@cinepop", JSON.stringify(filtroFilmes));
		toast.success("Filme removido com sucesso");
	}

	return (
		<div className="my-movies">
			<h1>Meus Filmes</h1>
			{favs.length === 0 ? (
				<span>Você não possui filmes salvos 😞 </span>
			) : null}
			<ul>
				{favs.map((item) => {
					return (
						<li key={item.id}>
							<h2>{item.title}</h2>
							<img
								src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
								alt={item.title}
							/>
							<div className="buttons">
								<Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
								<button onClick={() => excluirFilme(item.id)}>Excluir</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Favorites;
