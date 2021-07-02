package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.ReviewService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {

  private FilmService filmService;
  private ReviewService reviewService;

  @Autowired
  public ReviewSeeder(ReviewService reviewService, FilmService filmService) {
    this.reviewService = reviewService;
    this.filmService = filmService;
  }

  public void seed() {
    if (reviewService.findAll().size() == 0) {
      Optional<Film> film1 = filmService.findById(13);
      Optional<Film> film2 = filmService.findById(14);

      Review rev1 = new Review();
      rev1.setStarRating(5);
      rev1.setDescription("Greatest film ever!!!");
      rev1.setVoteCount(5);
      rev1.setFilm(film1.get());

      Review rev2 = new Review();
      rev2.setStarRating(3);
      rev2.setDescription("Meh, it was ok.");
      rev2.setVoteCount(-3);
      rev2.setFilm(film1.get());

      Review rev3 = new Review();
      rev3.setStarRating(1);
      rev3.setDescription("This is an example of an extremely long and negative review. These types of reviews may be left by individuals who are very upset at a particular film, or they are simply trolls.");
      rev3.setVoteCount(9);
      rev3.setFilm(film1.get());

      Review rev4 = new Review();
      rev4.setStarRating(5);
      rev4.setVoteCount(0);
      rev4.setFilm(film1.get());

      Review rev5 = new Review();
      rev5.setStarRating(4);
      rev5.setDescription("Second greatest film ever!!!");
      rev5.setVoteCount(3);
      rev5.setFilm(film2.get());

      Review rev6 = new Review();
      rev6.setStarRating(2);
      rev6.setVoteCount(0);
      rev6.setFilm(film2.get());

      reviewService.save(rev1);
      reviewService.save(rev2);
      reviewService.save(rev3);
      reviewService.save(rev4);
      reviewService.save(rev5);
      reviewService.save(rev6);
    }
  }
}
