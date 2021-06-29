package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.repositories.FilmRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FilmService {
  private FilmRepository filmRepository;

  @Autowired
  private FilmService(FilmRepository filmRepository) {
    this.filmRepository = filmRepository;
  }

  public Page<Film> findByGenreId(Pageable pageable, Integer id) {
    return this.filmRepository.findByGenreId(pageable, id);
  }

  public Optional<Film> findById(Integer id){
    return filmRepository.findById(id);
  }

  public List<Film> findAll() {
    return (List<Film>) filmRepository.findAll();
  }

  public void deleteFilm(Integer id) {
    this.filmRepository.deleteById(id);
  }

  public void save(Film film) {
    filmRepository.save(film);
  }
}
