package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.services.GenreService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/genres")
public class GenreRestController {

  private GenreService genreService;

  @Autowired
  public GenreRestController(GenreService genreService) {
    this.genreService = genreService;
  }

  @GetMapping
  public Map<String, Page> findAllGenres(Pageable pageable) {
    Map<String, Page> genreMap = new HashMap<>();
    genreMap.put("genres", genreService.findAll(pageable));
    return genreMap;
  }
}
