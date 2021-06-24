package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/films")
public class FilmsRestController {
  private FilmService filmService;
  private ReviewService reviewService;

  @Autowired
  public FilmsRestController(FilmService filmService, ReviewService reviewService) {
    this.filmService = filmService;
    this.reviewService = reviewService;
  }

  @GetMapping("/{id}")
  public Map<String, Optional<Film>> findByID(@PathVariable Integer id, Pageable pageable) {
    Map<String, Optional<Film>> filmMap = new HashMap<>();
    Optional<Film> filmName = filmService.findById(id);
    filmMap.put("film", filmName);
    return filmMap;
  }

  @PostMapping("/{id}/add-review")
  public ResponseEntity addNewReview (@PathVariable Integer id, @Valid @RequestBody Review review, BindingResult bindingResult){
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
      Film film = filmService.findById(id).get();
      review.setFilm(film);
      return new ResponseEntity<>(reviewService.save(review), HttpStatus.CREATED);
    }
  }

}
