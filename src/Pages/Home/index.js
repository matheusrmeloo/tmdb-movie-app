import React, { useCallback, useEffect, useState } from "react";
import api from "../../Services/tmdb";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(true);

	const carregarFilmes = useCallback(async () => {
		try {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: "953f8f778338022c7da36d5a7b91cebb",
					language: "pt-BR",
					page: 1,
				},
			});
			setFilmes(response.data.results);
			setLoading(false);
		} catch (error) {
			console.error("Erro ao carregar filmes:", error);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		carregarFilmes();
	}, []);

	if (loading) {
		return (
			<div className="loading">
				<h2>Carregando filmes...</h2>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="lista-filmes">
				{filmes.map((filme) => (
					<article key={filme.id}>
						<strong>{filme.title}</strong>
						<img
							src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
							alt={filme.title}
						></img>
						<Link to={`/filme/${filme.id}`}>Acessar</Link>
					</article>
				))}
			</div>
		</div>
	);
};

export default Home;
