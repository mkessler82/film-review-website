package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
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
      genreTwo.setImgUrl("https://depauliaonline.com/wp-content/uploads/2019/05/fingerprintmagnified.png");

      Genre genreThree = new Genre();
      genreThree.setName("Comedy");
      genreThree.setImgUrl("https://static01.nyt.com/images/2017/11/26/arts/26comedycrash-illo/26comedycrash-illo-superJumbo.gif");

      Genre genreFour = new Genre();
      genreFour.setName("SciFi");
      genreFour.setImgUrl("https://i.imgur.com/wkpNzQK.jpg");

      genreService.save(genreOne);
      genreService.save(genreTwo);
      genreService.save(genreThree);
      genreService.save(genreFour);
    }
  }
}
