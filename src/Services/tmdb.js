import axios from "axios";

//BASE_URL: https://api.themoviedb.org/3/
//URL: movie/now_playing?api_key=953f8f778338022c7da36d5a7b91cebb&language=pt-BR&page=2

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
});

export default api;
