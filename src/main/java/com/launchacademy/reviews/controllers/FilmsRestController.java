package com.launchacademy.reviews.controllers;


import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.FilmService;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/films")
public class FilmsRestController {
  private FilmService filmService;
  private GenreService genreService;

  @Autowired
  public FilmsRestController(FilmService filmService, GenreService genreService)
  {
    this.filmService = filmService;
    this.genreService = genreService;
  }

  @GetMapping("/{id}")
  public Map<String, Optional<Film>> findByID(@PathVariable Integer id, Pageable pageable) {
    Map<String, Optional<Film>> filmMap = new HashMap<>();
    Optional<Film> filmName = filmService.findById(id);
    filmMap.put("film", filmName);
    return filmMap;
  }



//  @PostMapping("/new")
//  public ResponseEntity savePet(@RequestBody Map<String, String> filmForm) {
//    Film film = new Film();
//    film.setTitle(filmForm.get("title"));
//    film.setImgUrl(filmForm.get("imgUrl"));
//    film.setYear(Integer.valueOf(filmForm.get("year")));
//    film.setDescription(filmForm.get("description"));
//
//    Integer id = filmForm.get("genreId");
//    Genre genre = genreService.findById(id).get();
//    film.setGenre(genre);
//
//    if (this.petService.save(pet) instanceof Pet) {
//      Map<String, Pet> map = new HashMap<>();
//      map.put("pet", pet);
//      return ResponseEntity.status(HttpStatus.CREATED).body(map);
//    } else {
//      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create resource");
//    }
//  }

}
