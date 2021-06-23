package com.launchacademy.reviews.controllers;


import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.services.FilmService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/films")
public class FilmsRestController {
  private FilmService filmService;

  @Autowired
  public FilmsRestController(FilmService filmService) {
    this.filmService = filmService;
  }

  @GetMapping("/{id}")
  public Map<String, Optional<Film>> findByID(@PathVariable Integer id, Pageable pageable) {
    Map<String, Optional<Film>> filmMap = new HashMap<>();
    Optional<Film> filmName = filmService.findById(id);
    filmMap.put("film", filmName);
    return filmMap;
  }
}
