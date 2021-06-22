package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Genre;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.text.translate.NumericEntityUnescaper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1/genres")
public class GenreRestController {
  private GenreService genreService;
  private FilmService filmService;

  @Autowired
  public GenreRestController(GenreService genreService, FilmService filmService)
  {
    this.genreService = genreService;
    this.filmService = filmService;
  }

  @GetMapping
  public Map<String, Page> findAllGenres(Model model, Pageable pageable) {
    Map <String, Page> genreMap = new HashMap<>();
    genreMap.put("genres", genreService.findAll(pageable));
    return genreMap;
  }

  @GetMapping("/{id}")
  public Map<String, Optional<Genre>> findByGenreId(@PathVariable Integer id, Pageable pageable) {
    Map<String, Optional<Genre>> genreMap = new HashMap<>();
    Optional<Genre> genreName = genreService.findById(id);
    genreMap.put("genre", genreName);
    return genreMap;
  }
}
