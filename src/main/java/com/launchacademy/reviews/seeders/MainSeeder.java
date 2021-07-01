package com.launchacademy.reviews.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MainSeeder implements CommandLineRunner {
  @Autowired private FilmSeeder filmSeeder;
  @Autowired private GenreSeeder genreSeeder;
  @Autowired private ReviewSeeder reviewSeeder;

  @Override
  public void run(String... args) throws Exception {
    genreSeeder.seed();
    filmSeeder.seed();
    reviewSeeder.seed();
  }
}
