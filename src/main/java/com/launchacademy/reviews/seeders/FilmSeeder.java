package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
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
      filmOne.setTitle("Friday the 13th");
      filmOne.setImgUrl("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mikeymo.nl%2Fwp-content%2Fuploads%2F2018%2F04%2Ffriday-the-13th-4-poster.jpg&f=1&nofb=1");
      filmOne.setYear(1990);
      filmOne.setDescription("Nightmare movie");
      Optional<Genre> genreOne = genreService.findById(1);
      filmOne.setGenre(genreOne.get());

      Film filmTwo = new Film();
      filmTwo.setTitle("Memento");
      filmTwo.setImgUrl("https://upload.wikimedia.org/wikipedia/en/c/c7/Memento_poster.jpg");
      filmTwo.setYear(2000);
      filmTwo.setDescription("Scary movie");
      Optional<Genre> genreTwo = genreService.findById(2);
      filmTwo.setGenre(genreTwo.get());

      filmService.save(filmOne);
      filmService.save(filmTwo);
    }
  }
}
