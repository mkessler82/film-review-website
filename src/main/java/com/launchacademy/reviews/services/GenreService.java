package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.repositories.GenreRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class GenreService {
  private GenreRepository genreRepository;

  @Autowired
  public GenreService(GenreRepository genreRepository) {
    this.genreRepository = genreRepository;
  }

  public Page<Genre> findAll(Pageable pageable) {
    return genreRepository.findAll(pageable);
  }

  public List<Genre> findAll() {
    return (List<Genre>) genreRepository.findAll();
  }

  public Genre save(Genre genre) {
    return genreRepository.save(genre);
  }

  public Optional<Genre> findById(Integer id) { return genreRepository.findById(id);
  }
}
