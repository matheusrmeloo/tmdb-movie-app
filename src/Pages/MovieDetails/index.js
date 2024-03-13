import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Services/tmdb";
import "./movieDetails.css";

const MovieDetails = () => {
	const { id } = useParams();
	const [filme, setFilme] = useState({});
	const [loading, setLoading] = useState(true);
	const navigation = useNavigate();

	const movieDetail = useCallback(async () => {
		try {
			const response = await api.get(`/movie/${id}`, {
				params: {
					api_key: "953f8f778338022c7da36d5a7b91cebb",
					language: "pt-BR",
				},
			});
			setFilme(response.data);
			setLoading(false);
		} catch (error) {
			console.log("Filme Não Encontrado");
			navigation("/", { replace: true });
		}
	}, [id, navigation]);

	useEffect(() => {
		movieDetail();
	}, [id, navigation]);

	const salvarFilme = () => {
		let movieSaved = JSON.parse(localStorage.getItem("@cinepop")) || [];

		const hasMovie = movieSaved.some((movie) => movie.id === filme.id);

		if (hasMovie) {
			toast.warn("Este filme já está na sua lista");
			return;
		}

		movieSaved.push(filme);
		localStorage.setItem("@cinepop", JSON.stringify(movieSaved));
		toast.success("Filme salvo com sucesso");
	};

	if (loading) {
		return (
			<div className="movie-info">
				<h1>Carregando detalhes...</h1>
			</div>
		);
	}

	return (
		<div className="movie-info">
			<h1>{filme.title}</h1>
			<img
				src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
				alt={filme.title}
			/>
			<h3>Sinopse</h3>
			<span>{filme.overview}</span>
			<strong> Avaliação: {filme.vote_average}/10</strong>

			<div className="area-buttons">
				<button onClick={salvarFilme}>Salvar</button>
				<button>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
					>
						Trailer
					</a>
				</button>
			</div>
		</div>
	);
};

export default MovieDetails;
