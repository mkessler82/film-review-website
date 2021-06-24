package com.launchacademy.reviews.repositories;

import com.launchacademy.reviews.models.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilmRepository extends PagingAndSortingRepository<Film, Integer> {
  public Page<Film> findByGenreId(Pageable pageable, Integer id);
}
