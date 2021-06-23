package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Collection;

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

  public List<Film> findAll() {
    return (List<Film>) filmRepository.findAll();
  }

  public void save(Film film) {
    filmRepository.save(film);
  }
}
