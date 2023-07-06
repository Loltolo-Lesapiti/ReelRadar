import './App.css';
import { useEffect, useState } from 'react';
import searchImage from './search.svg';
import MovieCard from './movieCard';

function App() {
  const apiKey = '2af14ba0';
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      searchMovies(searchTerm);
    } else {
      searchMovies('');
    }
  }, [searchTerm]);
  
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="p-16 flex justify-center items-center flex-col ">
      <h1 className='text-3xl antialiased'>
        MovieLand
        </h1>
      <div className="w-71 mx-auto my-8 flex items-center justify-center p-6 rounded-full bg-gray-900 shadow-lg">
        <input className='flex-1 border-none text-lg font-raleway font-medium pr-4 outline-none text-gray-500 bg-gray-900" type="text'
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchImage}
          alt="search image"
          onClick={() => setSearchTerm(searchTerm)}
        />
      </div>
      <div className="container">
        {movies.length > 0 || searchTerm.trim() === '' ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <div className="empty">No movies</div>
        )}
      </div>
    </div>
  );
}

export default App;
