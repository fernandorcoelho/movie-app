import React, { useEffect, useState } from 'react';

import Feedback from 'components/Feedback';
import Loading from 'components/Loading';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { SearchInput } from 'components/SearchInput';
import useDebounce from 'hooks/useDebounce';
import { useMovies } from 'hooks/useMovies';
import { Container } from 'styles/MoviesPage';

const MoviesPage = () => {
  const { displayedMovies, loading, error, searchMovies } = useMovies();
  const [query, setQuery] = useState('');

  const debounceQuery = useDebounce(query, 800);

  useEffect(() => {
    searchMovies(debounceQuery);
  }, [debounceQuery]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  if (error) {
    return <Feedback>Um erro inesperado ocorreu! {error}</Feedback>;
  }

  return (
    <Container>
      <SearchInput
        placeholder="Busque por um filme por nome, ano ou gênero..."
        onChange={onSearchChange}
        value={query}
      />

      {displayedMovies.length === 0 && !loading && (
        <Feedback>Nenhum resultado foi encontrado</Feedback>
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          {displayedMovies?.map((movie, index) => {
            // console.log(movie?.id, index);
            return (
              <MovieCard
                key={index}
                id={movie?.id}
                genres={movie?.genres}
                overview={movie?.overview}
                poster_path={movie?.poster_path}
                release_date={movie?.release_date}
                title={movie?.title}
                vote_average={movie?.vote_average}
              />
            );
          })}

          <Pagination />
        </>
      )}
    </Container>
  );
};

export default MoviesPage;
