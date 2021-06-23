package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/films")
public class FilmsApiV1Controller {
  private FilmService filmService;
  private GenreService genreService;

  @Autowired
  public FilmsApiV1Controller(FilmService filmService, GenreService genreService) {
    this.filmService = filmService;
    this.genreService = genreService;
  }



}
