package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.FilmForm;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import com.launchacademy.reviews.models.Genre;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


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
  public Map<String, Page> findAllGenres(Pageable pageable) {
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

  @PostMapping("/{id}/new")
  public ResponseEntity saveNewFilm (@PathVariable Integer id, @Valid @RequestBody FilmForm filmForm, BindingResult bindingResult) {

    if(bindingResult.hasErrors()) {
      Map<String, Map<String, String>> errorsMap = new HashMap<>();
      Map<String, String> errorsFieldMessage = new HashMap<>();
      List<FieldError> errors = bindingResult.getFieldErrors();
      for (FieldError error : errors ) {
        errorsFieldMessage.put(error.getField(), error.getDefaultMessage());
      }
      errorsMap.put("errors", errorsFieldMessage);

      return new ResponseEntity(errorsMap, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    else {
        Film film = new Film();
        film.setTitle(filmForm.getTitle());
        film.setYear(filmForm.getYear());
        film.setImgUrl(filmForm.getImgUrl());
        film.setDescription(filmForm.getDescription());
        Genre genre = genreService.findById(filmForm.getGenreId()).get();
        film.setGenre(genre);
        filmService.save(film);
        Map<String, Film> filmQ = new HashMap<>();
        filmQ.put("film", film);
        return new ResponseEntity<>(filmQ, HttpStatus.CREATED);
    }
  }
}
