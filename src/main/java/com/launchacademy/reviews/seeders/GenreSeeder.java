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
    if (this.genreService.findAll().size() == 0) {
      Genre genreOne = new Genre();
      genreOne.setName("Horror");
      genreOne.setImgUrl("/images/horror-genre.jpg");
      Genre genreTwo = new Genre();
      genreTwo.setName("Drama");
      genreTwo.setImgUrl("/images/drama-genre.jpg");
      Genre genreThree = new Genre();
      genreThree.setName("Adventure");
      genreThree.setImgUrl("/images/adventure-genre.jpg");
      Genre genreFour = new Genre();
      genreFour.setName("Fantasy");
      genreFour.setImgUrl("/images/fantasy-genre.jpg");
      Genre genreFive = new Genre();
      genreFive.setName("Romance");
      genreFive.setImgUrl("/images/romance-genre.jpg");
      Genre genreSix = new Genre();
      genreSix.setName("Sci Fi");
      genreSix.setImgUrl("/images/scifi-genre.jpg");
      this.genreService.save(genreOne);
      this.genreService.save(genreTwo);
      this.genreService.save(genreThree);
      this.genreService.save(genreFour);
      this.genreService.save(genreFive);
      this.genreService.save(genreSix);
    }
  }
}
