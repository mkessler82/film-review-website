package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class FilmSeeder {
  private FilmService filmService;
  private GenreService genreService;

  @Autowired
  public FilmSeeder(FilmService filmService, GenreService genreService) {
    this.filmService = filmService;
    this.genreService = genreService;
  }

  public void seed() {
    if (filmService.findAll().size() == 0) {

      Film filmOne = new Film();
      filmOne.setTitle("Horror");
      filmOne.setImgUrl("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FhCE09C7pOYkiXVSY0HjAUcmTBh0.jpg&f=1&nofb=1");
      filmOne.setYear(1990);
      filmOne.setDescription("Nightmare movie");
      Optional<Genre> genreOne = genreService.findById(1);
      filmOne.setGenre(genreOne.get());

      Film filmTwo = new Film();
      filmTwo.setTitle("13th Friday");
      filmTwo.setImgUrl("https://depauliaonline.com/wp-content/uploads/2019/05/fingerprintmagnified.png");
      filmTwo.setYear(2000);
      filmTwo.setDescription("Scary movie");
      Optional<Genre> genreTwo = genreService.findById(2);
      filmTwo.setGenre(genreTwo.get());

      filmService.save(filmOne);
      filmService.save(filmTwo);
    }
  }
}
