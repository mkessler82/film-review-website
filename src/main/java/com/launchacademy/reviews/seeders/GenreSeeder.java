package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class GenreSeeder {
  private GenreService genreService;

  @Autowired
  public GenreSeeder(GenreService genreService) {
    this.genreService = genreService;
  }

  public void seed() {
    if (genreService.findAll().size() == 0) {
      Genre genreOne = new Genre();
      genreOne.setName("Horror");
      genreOne.setImgUrl("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FhCE09C7pOYkiXVSY0HjAUcmTBh0.jpg&f=1&nofb=1");

      Genre genreTwo = new Genre();
      genreTwo.setName("True Crime");
      genreTwo.setImgUrl("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FhCE09C7pOYkiXVSY0HjAUcmTBh0.jpg&f=1&nofb=1");

      genreService.save(genreOne);
      genreService.save(genreTwo);
    }
  }
}
